var io = require('/restearnfinal/node_modules/socket.io').listen(65080);

io.sockets.on('connection', function (socket) {
  console.log('Server listening on port: 65080');
  var address = socket.handshake.address;
  console.log('New connection from ' + address.address + ':' + address.port);

io.sockets.emit('this', { will: 'be received by everyone'});

socket.on('private message', function (msg) {
console.log('New Chat Message ', msg);
io.sockets.emit('txt',msg);
});

socket.on('disconnect', function () {
io.sockets.emit('User Disconnected');
});

socket.on('newuser', function (name) {
console.log(name,' Is Now Connected!');
io.sockets.emit('txt',name + ' is now online');
});

socket.on('exit', function (name) {
console.log(name,' Has Been Disconnected!');
io.sockets.emit('txt',name + ' is now offline');
});
});
