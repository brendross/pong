var canvas;
var context;

function drawBoard(ctx) {
	ctx.rect(0, 0, 600, 400);
	ctx.fillStyle = "#000000";
	ctx.fill();

	ctx.beginPath();
	ctx.moveTo(600/2, 0);
	ctx.lineTo(600/2, 400);
	ctx.lineWidth = 2;
	ctx.strokeStyle = "#ffffff"
	ctx.stroke();
	ctx.closePath();
}

function drawPaddle(ctx, player, paddleY) {
	var paddleX = player ? 575 : 15 // false is player 1
	ctx.rect(paddleX, paddleY, 10, 60);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
}

function drawBall(ctx, ballX, ballY) {
	ctx.rect(ballX, ballY, 15, 15);
	ctx.fillStyle = "#ffffff";
	ctx.fill();
}

function drawScore(ctx, player, score) {
	var scoreX = player ? 430 : 130
	ctx.font = '50pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText(score, scoreX, 70);
}

function draw(context, gameState) {
	drawBoard(context);

	// Player 1
	drawPaddle(context, 0, gameState.player1.height - 30);
	drawScore(context, 0, gameState.player1.score);

	// Player 2
	drawPaddle(context, 1, gameState.player2.height - 30);
	drawScore(context, 1, gameState.player2.score);

	drawBall(context, gameState.ball.x - 7.5, gameState.ball.y - 7.5);
}

function initialize() {
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

	initialGameState =  {
			player1: {
				height: 200,
				score: 0
			},
			player2: {
				height: 200,
				score: 0
			},
			ball: {
				x: 600/2,
				y: 400/2
			}
		}

	draw(context, initialGameState);
}

function displayWinner(ctx, player) {
	textX = player ? 325 : 50
	player = player ? "Player 2" : "Player 1"
	ctx.font = '30pt Calibri';
    ctx.fillStyle = 'white';
    ctx.fillText(player + " wins!", textX, 170);
}