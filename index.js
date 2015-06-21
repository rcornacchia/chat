var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// routing for / --> index.html
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// log when a user connects or disconnects
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// log incomming messages to the console
io.on('connection', function(socket) {
	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		if(msg){io.emit('chat message', msg);}
	});
});

// // emit incoming messages (emit sends event to everyone)
// io.on('connection', function(socket) {
// 	socket.on('chat message', function(msg) {
// 		io.emit('chat message', msg);
// 	});
// });

http.listen(3000, function() {
	console.log('listening on *:3000');
});