var io = require('socket.io').listen(65080);

console.log('Server acik');
var request = require('request');

io.on('connection', function(socket) {


    console.log('Server listening on port: 65080');
    var address = socket.handshake.address;
    console.log('New connection from ' + address.address + ':' + address.port);

  
	
});
