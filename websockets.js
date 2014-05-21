var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
	socket.emit('newPlayer');
});

socket.on('message', function(data) {
	console.log(data);
});