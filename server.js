var express = require("express")
	, http = require('http')
	, app = express()
	, path = require('path');

app.use('/public', express.static(__dirname + '/public'));

var server = http.createServer(app)
	, io = require('socket.io').listen(server);

server.listen(3000);

// routing
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

var game = require('./app/game.js')
var timer;

// websockets
io.sockets.on('connection', function(socket) {
	socket.on('newPlayer', function() {
		if(!game.player1.active || !game.player2.active) {
			addPlayer(socket);
		}
	});

	socket.on('keyPress', function(data) {
		keyData = JSON.parse(data);
		if(game.player1.active && game.player2.active) {
			if(socket.player === 1) {
				if(keyData.key == "up") { game.player1.upPressed = keyData.pressed; }
				else if(keyData.key == "down") { game.player1.downPressed = keyData.pressed; }
			}
			else if(socket.player === 2) {
				if(keyData.key == "up") { game.player2.upPressed = keyData.pressed; }
				else if(keyData.key == "down") { game.player2.downPressed = keyData.pressed; }
			}
		}
	});

	gameOver = function(player) {
		io.sockets.emit("gameOver", JSON.stringify({ winner: player }));
	}

	socket.on('disconnect', function() {
		if(socket.player === 1) { game.player1.active = false; clearInterval(timer); }
		else if(socket.player === 2) { game.player2.active = false; clearInterval(timer); }
	});

	updateGame = function() {
		game.tick();

		io.sockets.emit("updateGame", JSON.stringify(game.jsonifyGame()));

		if(game.player1.score >= 7) { clearInterval(timer); gameOver(0); return; } // 0 is Player1
		if(game.player2.score >= 7) { clearInterval(timer); gameOver(1); return; } // 1 is Player2
	}
});

function addPlayer(socket) {
	if(!game.player1.active) {
		game.player1.active = true;
		socket.player = 1;
	}
	else if(!game.player2.active) {
		game.player2.active = true;
		socket.player = 2;
	}
	
	if(game.player1.active && game.player2.active) {
		require('./app/ball.js').reset();
		game.resetPlayers();
		timer = setInterval(updateGame, 10);
	}
}