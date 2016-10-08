
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
        var tip = json_message.type;
        console.log(tip);
   
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
        var durum_kul=false;

		  var json_message = JSON.parse(msg);
    var tip=json_message.type;
	
	
      if(tip=="onur1234"){
		                     
		  var my_cl_obj=new Object();
	      my_cl_obj.data=json_message;
	      my_cl_obj.con=socket;
		                           
		                     for(var i=0;i<client_sockets.length;++i){
								 
								 if(client_sockets[i].data.user_id==my_cl_obj.data.user_id){
									 ////kullanici mevcut///
									 durum_kul=true;
									 
									 if(my_cl_obj.data.cafe_durum=="yok_farklı_var"&&client_sockets[i].data.cafe_id!=my_cl_obj.data.cafe_id){
										 
										////diger cafelere_bildirim yolla//// 
										 
										 for(var i3=0;i3<cafe_sockets.length;++i3){
											 if(cafe_sockets[i3].cafe_id==client_sockets[i].data.cafe_id){
												 for(var i4=0;i4<cafe_sockets[i3].cafe_array.length;++i4){
													cafe_sockets[i3].cafe_array[i4].con.emit(cafe_sockets[i3].cafe_id + "_cafe_degisti", client_sockets[i].data.user_id);
												 }
											 }
										 }
										 
										 
									 }
									 
									 
									 client_sockets[i]=my_cl_obj;
									 
									 
									 
								 }
								 
								 
									 
									
									 
									
								 
								 
								 
								 
								 
								 
								 
								 
								 
								 
								 
								 
								 
							 }
		                 if(durum_kul==false){
							 
							 client_sockets.push(my_cl_obj);
						 }
		  
		                 
		   if(my_cl_obj.data.cafe_durum=="yok_farklı_var"){
			   /////ilk oturum başka cefede var///
			   
			                             for(var i6=0;i6<cafe_sockets.length;++i6){
											 if(cafe_sockets[i6].cafe_id==my_cl_obj.data.cafe_id){
												 for(var i7=0;i7<cafe_sockets[i6].cafe_array.length;++i7){
													cafe_sockets[i6].cafe_array[i7].con.emit(cafe_sockets[i6].cafe_id + "_oturum_acildi", my_cl_obj.data.user_id);
												 }
											 }
										 }
			   
			   
			   
		   }
		    if(my_cl_obj.data.cafe_durum=="yok_farklı_yok"){
			   ////ilk oturum////
			   
			   
			    for(var i6=0;i6<cafe_sockets.length;++i6){
											 if(cafe_sockets[i6].cafe_id==my_cl_obj.data.cafe_id){
												 for(var i7=0;i7<cafe_sockets[i6].cafe_array.length;++i7){
													cafe_sockets[i6].cafe_array[i7].con.emit(cafe_sockets[i6].cafe_id + "_oturum_acildi", my_cl_obj.data.user_id);
												 }
											 }
										 }
			   
			   
			   
			   
			   
			   
			   
		   }
		    if(my_cl_obj.data.cafe_durum=="var_farklı_yok_masa"||my_cl_obj.data.cafe_durum=="var_farklı_var_masa"){
			   ////masa degis/////
			    for(var i6=0;i6<cafe_sockets.length;++i6){
											 if(cafe_sockets[i6].cafe_id==my_cl_obj.data.cafe_id){
												 for(var i7=0;i7<cafe_sockets[i6].cafe_array.length;++i7){
													cafe_sockets[i6].cafe_array[i7].con.emit(cafe_sockets[i6].cafe_id + "_masa_degisti", my_cl_obj.data.user_id);
												 }
											 }
										 }
			   
			   
			   
		   }
		   	

		  
		  
		  
		  
	                    }
						
						else if(tip=="onur1234siparis"){
							
	      var my_cl_obj=new Object();
	      my_cl_obj.data=json_message;
	      my_cl_obj.con=socket;
							
							 for(var i6=0;i6<cafe_sockets.length;++i6){
											 if(cafe_sockets[i6].cafe_id==my_cl_obj.data.cafe_id){
												 for(var i7=0;i7<cafe_sockets[i6].cafe_array.length;++i7){
													cafe_sockets[i6].cafe_array[i7].con.emit(cafe_sockets[i6].cafe_id + "_siparis_verildi", my_cl_obj.data.user_id);
												 }
											 }
										 }
							
							
							
							
							
							
						}
		
		
		
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
