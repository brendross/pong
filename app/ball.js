function Ball() {
	this.width = 15;
	this.speed = 5;
	this.maxBounceAngle = Math.PI/3;

	this.x = 300;
	this.y = 200;
	this.velX = 0;
	this.velY = 0;

	this.reset = function() {
		this.x = 300;
		this.y = 200;

		var random = Math.round(Math.random());
		random ? this.velX = 3 : this.velX = -3;

		this.velY = 0;
	}

	this.move = function() {
		this.x = this.x + this.velX;
		this.y = this.y + this.velY;
	}
}

module.exports = new Ball();