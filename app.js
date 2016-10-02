
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
										console.log("i:"+i+"cafe:"+cafe_sockets[i].cafe_id);
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
										}else {
											
											////deneme////
											
											
											   var send_data = new Object();
                                               send_data.kul_id = 7;
                                               send_data.cafe_id = 12;
                                                 request.post({
                                                 url: 'http://restearnserver.tk/RestUpp/get_degisen_cafe.php',
                         data: {
                            message: JSON.stringify(send_data)
                           
                        }
                    }, function(error, response, body) {
			      console.log('body:'+body);
			    console.log('caf:'+cafe_sockets[i].cafe_array[0].data.cafe_id);
                        cafe_sockets[i].cafe_array[0].con.emit(cafe_sockets[i].cafe_array[0].data.cafe_id + "_cafe_degisti", body);
                    });
                  
											
											
											
											
											
											/////deneme////
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
