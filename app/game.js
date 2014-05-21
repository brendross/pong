function Game() {
	this.width = 600;
	this.height = 400;
	this.paddleWidth = 10;
	this.paddleHeight = 60;

	this.player1 = { "active": false, "upPressed": false, "downPressed": false, "height": 200, "score": 0 };
	this.player2 = { "active": false, "upPressed": false, "downPressed": false, "height": 200, "score": 0 };

	this.ball = require('./ball');
	this.ballBounds = { "x": { "min": 0, "max": this.width }, "y": { "min": 0, "max": this.height }};

	this.paddleVel = 2.5;

	this.resetPlayers = function() {
		this.player1.height = 200;
		this.player1.score = 0;

		this.player2.height = 200;
		this.player2.score = 0;
	}

	this.tick = function() {
		this.ball.move();

		// Collision with walls and score zones
		if(this.ball.y < this.ballBounds.y.min || this.ball.y > this.ballBounds.y.max) { this.ball.velY*=-1; }
		if(this.ball.x < this.ballBounds.x.min) { this.player2.score+=1; this.ball.reset(); }
		if(this.ball.x > this.ballBounds.x.max) { this.player1.score+=1; this.ball.reset(); }

		// Collision with paddles
		if(this.isBallTouchingP1()) { this.setBallDirection(this.player1, 1); }
		if(this.isBallTouchingP2()) { this.setBallDirection(this.player2, -1); }

		this.movePaddle(this.player1);
		this.movePaddle(this.player2);
	}

	this.jsonifyGame = function() {
		return {
			player1: {
				height: this.player1.height,
				score: this.player1.score
			},
			player2: {
				height: this.player2.height,
				score: this.player2.score
			},
			ball: {
				x: this.ball.x,
				y: this.ball.y
			}
		}
	}

	this.movePaddle = function(player) {
		if(player.upPressed) { player.height -= this.paddleVel; }
		if(player.downPressed) { player.height += this.paddleVel; }

		// Correct for paddle offscreen
		if(player.height < 30) { player.height = 30; }
		if(player.height > 370) { player.height = 370; }
	}

	this.isBallTouchingP1 = function() {
		var p1touchingX = (this.ball.x - (this.ball.width/2)) - (10 + (this.paddleWidth/2)) <= 0;
		var p1touchingY = ((this.player1.height - (this.paddleHeight/2)) < this.ball.y)
		&& ((this.player1.height + (this.paddleHeight/2)) > this.ball.y);
		return p1touchingX && p1touchingY;	
	}

	this.isBallTouchingP2 = function() {
		var p2touchingX = (580 - (this.paddleWidth/2)) - (this.ball.x + (this.ball.width/2)) <= 0;
		var p2touchingY = ((this.player2.height - (this.paddleHeight/2)) < this.ball.y)
		&& ((this.player2.height + (this.paddleHeight/2)) > this.ball.y);
		return p2touchingX && p2touchingY;
	}

	this.setBallDirection = function(player, multi) {
		var relativeIntersect = player.height - this.ball.y;
		var normalizedIntersection = relativeIntersect/(this.paddleHeight/2);
		var bounceAngle = normalizedIntersection * this.ball.maxBounceAngle;

		this.ball.velX = this.ball.speed * multi * Math.cos(bounceAngle);
		this.ball.velY = this.ball.speed * multi *-Math.sin(bounceAngle);
	}
}

module.exports = new Game();