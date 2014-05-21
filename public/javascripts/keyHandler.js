$(function() {
	window.addEventListener('keydown', keyDown);
	window.addEventListener('keyup', keyUp);

	function keyDown() {
		var keyData;
		if(event.keyCode === 38) { keyData = { key: "up", pressed: true }; }
		else if(event.keyCode === 40) { keyData = { key: "down", pressed: true }; }
		else return
		socket.emit('keyPress', JSON.stringify(keyData));
	}

	function keyUp() {
		var keyData;
		if(event.keyCode === 38) { keyData = { key: "up", pressed: false }; }
		else if(event.keyCode === 40) { keyData = { key: "down", pressed: false }; }
		else return
		socket.emit('keyPress', JSON.stringify(keyData)); 
	}
});