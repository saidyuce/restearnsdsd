var io = require('socket.io').listen(65080);

console.log('Deneme log');



var cafe_sockets=new Array();
var client_sockets=new Array();







io.on('connection', function (socket) {
  console.log('Server listening on port: 65080');
  var address = socket.handshake.address;
  console.log('New connection from ' + address.address + ':' + address.port);

io.sockets.emit('this', { will: 'be received by everyone'});

socket.on('private message', function (msg) {
	
	var json_message = JSON.parse(msg);
    var tip=json_message.type;
	console.log(tip);

	if(tip=="onur1234siparis"){
          var my_cl_obj=new Object();
        	my_cl_obj.data=json_message;
	       

	for(var i=0;i<cafe_sockets.length;++i){
			if(cafe_sockets[i].data.cafe_id==my_cl_obj.data.cafe_id){
				
				 cafe_sockets[i].con.emit(cafe_sockets[i].data.temp_key, 'siparis_'+my_cl_obj.data.user_id);
			}
		 

	}	  

 
 
 
 }

	
else if(tip=="onur1234"){
	
	var my_cl_obj=new Object();
	my_cl_obj.data=json_message;
	my_cl_obj.con=socket;
	var durum="yok";
	for(var i=0;i<client_sockets.length;++i){
		
		
		if(client_sockets[i].data.user_id==my_cl_obj.data.user_id){
		
if(client_sockets[i].data.cafe_id!=my_cl_obj.data.cafe_id){
	
	cafe_sockets[i].con.emit(cafe_sockets[i].data.temp_key, 'cafe_degisti_'+my_cl_obj.data.user_id);
	
}
		



		
			if(client_sockets[i].data.siparis_key==my_cl_obj.data.siparis_key&&client_sockets[i].data.user_id==my_cl_obj.data.user_id)
		{
			durum="var";
			
		}else {
			client_sockets.splice(i,1);
			console.log('önceki silindi yeni eklencek '+my_cl_obj.data.user_id);
			durum="yok";
		}
		
		
		
		
		
		}
		
		
	}
	if(durum=="var"){
		console.log('var '+my_cl_obj.data.user_id);
	}
	else {
			console.log('yok '+my_cl_obj.data.user_id);
			
			client_sockets.push(my_cl_obj);
				for(var i=0;i<cafe_sockets.length;++i){
					if(cafe_sockets[i].data.cafe_id==my_cl_obj.data.cafe_id){
						
						cafe_sockets[i].con.emit(cafe_sockets[i].data.temp_key, 'oturum_acıldı_'+my_cl_obj.data.user_id);
					
					
					
					}
					
				}
			
	}

}

else if(tip=="said1234"){
      
var my_cl_obj2=new Object();
	my_cl_obj2.data=json_message;
	my_cl_obj2.con=socket;
var durum="yok";
	for(var i=0;i<cafe_sockets.length;++i){
		
		
		if(cafe_sockets[i].data.cafe_id==my_cl_obj2.data.cafe_id){
			
			if(cafe_sockets[i].data.temp_key==my_cl_obj2.data.temp_key&&cafe_sockets[i].data.cafe_id==my_cl_obj2.data.cafe_id)
		{
			durum="var";
			
		}else {
			cafe_sockets.splice(i,1);
			console.log('önceki silindi yeni eklencek '+my_cl_obj2.data.cafe_id);
			durum="yok";
		}
		
		}
		
		
	}
	if(durum=="var"){
		console.log('var '+my_cl_obj2.data.cafe_id);
	}
	else {
			console.log('yok '+my_cl_obj2.data.cafe_id);
			
			cafe_sockets.push(my_cl_obj2);
	}
	  

	  
	
}

	
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
