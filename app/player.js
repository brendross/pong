
function Player() {
	this.active = false;
	this.upPressed = false;
	this.downPressed = false;
	this.height = 200;
	this.score = 0;
}

module.exports = function() {
	new Player();
}