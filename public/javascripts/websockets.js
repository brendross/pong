var socket = io.connect('http://mabosbross-m2:3000');

socket.on('connect', function() {
	socket.emit('newPlayer');
	initialize();
});

socket.on('updateGame', function(data) {
	gameState = JSON.parse(data);
	draw(context, gameState);
});

socket.on('gameOver', function(data) {
	gameState = JSON.parse(data);
	displayWinner(context, gameState.winner);
});