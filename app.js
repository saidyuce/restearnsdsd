Skip to content
This repository
Search
Pull requests
Issues
Gist
 @saidyuce
 Watch 0
  Star 0
  Fork 0 saidyuce/restearnfinal
 Code  Issues 0  Pull requests 0  Projects 0  Wiki  Pulse  Graphs  Settings
Branch: master Find file Copy pathrestearnfinal/app.js
adc4fa0  10 minutes ago
@saidyuce saidyuce Update
1 contributor
RawBlameHistory     
Executable File  125 lines (69 sloc)  2.67 KB
var io = require('socket.io').listen(65080);

console.log('Deneme log');

var cafe_sockets = new Array();
var client_sockets = new Array();

var request = require('request');

io.on('connection', function(socket) {
    console.log('Server listening on port: 65080');
    var address = socket.handshake.address;
    console.log('New connection from ' + address.address + ':' + address.port);

    io.sockets.emit('this', {
        will: 'be received by everyone'
    });

	
	
	
	
	
    socket.on('cafe_oturum', function(msg) {
    var json_message = JSON.parse(msg);
    var tip=json_message.type;
	
	
      if(tip=="said1234"){
		 
		  var my_cl_obj2=new Object();
	      my_cl_obj2.data=json_message;
	      my_cl_obj2.con=socket;
		  
		  var cafe_soket_array=new Array();
		  var cafe_soket_obj=new Object();
		  cafe_soket_obj.cafe_id= my_cl_obj2.data.cafe_id;
		  cafe_soket_array.push(my_cl_obj2);
		  cafe_soket_obj.cafe_array=cafe_soket_array;
		 
		  
		  
		                             var durum=false;
		                            //////
									for(var i=0;i<cafe_sockets.length;++i){
										
										if(cafe_sockets[i].cafe_id==my_cl_obj2.data.cafe_id){
											
											durum=true;
											var durum2=false;
											for(var i2=0;i2<cafe_sockets[i].cafe_array;++i2){
												
												if(cafe_sockets[i].cafe_array[i2].data.cafe_kul_id==my_cl_obj2.data.cafe_kul_id){  
												
												durum2=true;  
												cafe_sockets[i].cafe_array[i2]=my_cl_obj2;  
                                                
												}
												
												
											}
											if(durum2==false){
													cafe_sockets[i].cafe_array.push(my_cl_obj2);
													 console.log('eklendi');
												}
										}
									}
									if(durum==false){
										
										cafe_sockets.push(cafe_soket_obj);
										console.log('eklendi_hic_yoktu');
									}
									
									
									///////
		  
	                    }
	    
        console.log('New Chat Message ', msg);
        io.sockets.emit('txt', msg);
    });
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
    socket.on('kullanici_oturum', function(msg) {

        var json_message = JSON.parse(msg);
        var tip = json_message.type;
        console.log(tip);
        var durum = "yok";

		
		
		
		
        console.log('New Chat Message ', msg);
        io.sockets.emit('txt', msg);
    });

    socket.on('disconnect', function() {
        io.sockets.emit('User Disconnected');
    });

    socket.on('newuser', function(name) {
        console.log(name, ' Is Now Connected!');
        io.sockets.emit('txt', name + ' is now online');
    });

    socket.on('exit', function(name) {
        console.log(name, ' Has Been Disconnected!');
        io.sockets.emit('txt', name + ' is now offline');
    });
});
Contact GitHub API Training Shop Blog About
© 2016 GitHub, Inc. Terms Privacy Security Status Help
