var app = require('express')();
var socketio = require('socket.io');
var adapter = require('socket.io-redis');

var server = app.listen(process.env.NODE_PORT || 9000);

io = socketio(server);
io.adapter(adapter());
