var io = require('socket.io').listen(65080);

console.log('Server acik');

var cafe_sockets = new Array();
var client_sockets = new Array();
var push_tokens = new Array();
var orders = new Array();

var request = require('request');

function sendMessageToUser(push_token, message, userData) {
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' :' application/json',
      'Authorization': 'key=AAAA3dRXusc:APA91bFqoC0qnbp4-C4xnLB0CMP5yMzQOvxEEpY39SZKhzAmf46FIja-_YvlkXJoHdEs0gO3Se8fDAQ_5xFE6Lj0f_I9EAYSxtCvjIrFd1fbOAEnRsY6Dv6A0ZoFU0wmAayktQhrzfny'
    },
    body: JSON.stringify(
      { "notification" : {
	"body" : message
      },
      "data": {
       	"userData": userData
      },
      "to" : push_token
      }
    )
  }, function(error, response, body) {
    if (error) { 
      console.error(error, response, body); 
    }
    else if (response.statusCode >= 400) { 
      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
    }
    else {
      console.log('Done!')
    }
  });
}

io.on('connection', function(socket) {
    console.log('Server listening on port: 65080');
    var address = socket.handshake.address;
    console.log('New connection from ' + address.address + ':' + address.port);

    io.sockets.emit('this', {
        will: 'be received by everyone'
    });
	
	// kafe bildirim atma kodu distance göre filtrelencek sonradan
    /*socket.on('cafe_push_token', function(msg) {	    
	for (var i = 0; i < push_tokens.length; ++i) {
		sendMessageToUser(push_tokens[i].push_token + '', 'Kullanıcıya mesaj yollandı' + push_tokens[i].user_id, msg + "")
	}
    });*/
	
    socket.on('push_token', function(msg) {
	var json_message = JSON.parse(msg);
	var tokenObj = new Object();
	tokenObj.user_id = json_message.user_id;
	tokenObj.push_token = json_message.push_token;
	var durum = false;
	for (var i = 0; i < push_tokens.length; ++i) {
		if (push_tokens[i].user_id == tokenObj.user_id) {
			durum = true;
			push_tokens[i].push_token = tokenObj.push_token;
			console.log('Push Token vardı, güncellendi');
		}
	}
	if (durum == false) {
		push_tokens.push(tokenObj);
		console.log('Push Token yoktu, yeni eklendi');
		console.log(tokenObj);
	}
    });
	
    socket.on('cafe_oturum', function(msg) {
        var json_message = JSON.parse(msg);
        var tip = json_message.type;
        console.log(tip);

        if (tip == "said1234") {
            var my_cl_obj2 = new Object();
            my_cl_obj2.data = json_message;
            my_cl_obj2.con = socket;

            var cafe_soket_array = new Array();
            var cafe_soket_obj = new Object();
            cafe_soket_obj.cafe_id = my_cl_obj2.data.cafe_id;
            cafe_soket_array.push(my_cl_obj2);
            cafe_soket_obj.cafe_array = cafe_soket_array;
		
            var durum = false;
            
            for (var i = 0; i < cafe_sockets.length; ++i) {
                if (cafe_sockets[i].cafe_id == my_cl_obj2.data.cafe_id) {
                    durum = true;
                    var durum2 = false;
                    for (var i2 = 0; i2 < cafe_sockets[i].cafe_array; ++i2) {
                        if (cafe_sockets[i].cafe_array[i2].data.cafe_kul_id == my_cl_obj2.data.cafe_kul_id) {
                            durum2 = true;
                            cafe_sockets[i].cafe_array[i2] = my_cl_obj2;
                        }
                    }
                    if (durum2 == false) {			    
                        cafe_sockets[i].cafe_array.push(my_cl_obj2);
                        console.log('eklendi');			    
                    }
                }
            }
            if (durum == false) {
                cafe_sockets.push(cafe_soket_obj);
                console.log('eklendi_hic_yoktu');
	    }
        }else if (tip == "said1234siparis") {

            var my_cl_obj = new Object();
            my_cl_obj.data = json_message;
            my_cl_obj.con = socket;
	console.log(client_sockets.length);
		console.log('asdasd');
            for (var i6 = 0; i6 < client_sockets.length; ++i6) {
		    console.log('User id:');
			console.log(client_sockets[i6].data.user_id);
                if (client_sockets[i6].data.user_id == my_cl_obj.data.user_id) {
		
			// socket emit
            client_sockets[i6].con.emit(client_sockets[i6].data.user_id + "_siparis_geri_bildirim",my_cl_obj.data );
			console.log(client_sockets[i6].data.user_id+"");
			// push
			for (var i99 = 0; i99 < push_tokens.length; ++i99) {
				if (push_tokens[i99].user_id == client_sockets[i6].data.user_id) {
					sendMessageToUser(push_tokens[i99].push_token + '', 'Siparişiniz onaylandı', msg + "")
					console.log('send message to user döndü');
				} else {
					console.log('id eşleşmedi, mesaj yollanmadı');
				}
			}
                }
            }
        }
else if (tip == "said1234oturum") {

            var my_cl_obj = new Object();
            my_cl_obj.data = json_message;
            my_cl_obj.con = socket;
	        console.log(client_sockets.length);
            for (var i6 = 0; i6 < client_sockets.length; ++i6) {
		    console.log('User id:');
			console.log(client_sockets[i6].data.user_id);
                if (client_sockets[i6].data.user_id == my_cl_obj.data.user_id) {
			// socket emit
            client_sockets[i6].con.emit(client_sockets[i6].data.user_id + "_oturum_geri_bildirim",my_cl_obj.data );
			console.log(client_sockets[i6].data.user_id+"");
			// push
			for (var i99 = 0; i99 < push_tokens.length; ++i99) {
				if (push_tokens[i99].user_id == client_sockets[i6].data.user_id) {
					sendMessageToUser(push_tokens[i99].push_token + '', 'Oturumunuz kapatıldı', msg + "")
					console.log('send message to user döndü');
				} else {
					console.log('id eşleşmedi, mesaj yollanmadı');
				}
			}
                }
            }
        }
        console.log('New Chat Message ', msg);
        io.sockets.emit('txt', msg);
    });

	
	
	  socket.on('cafe_oturum_etki', function(msg) {
        var json_message = JSON.parse(msg);
        var tip = json_message.type;
       

        if (tip == "said1234etki") {
         
      
	   var cafe_id=json_message.cafe_id;
	                     for (var i6 = 0; i6 < cafe_sockets.length; ++i6) {
                    if (cafe_sockets[i6].cafe_id == cafe_id) {
                        for (var i7 = 0; i7 < cafe_sockets[i6].cafe_array.length; ++i7) {
				if(cafe_sockets[i6].cafe_array[i7].con!=socket){
				    cafe_sockets[i6].cafe_array[i7].con
				    .emit(cafe_sockets[i6].cafe_id + "_local_etki", msg);
				}
                        
                        }
                    }
                }           
	   
		   
        
        }
		
		
        console.log('New Message ', msg);
        io.sockets.emit('txt', msg);
    });
	
	
	
	
	
	
	
    socket.on('kullanici_oturum', function(msg) {

	console.log(msg);
        var json_message = JSON.parse(msg);
        var tip = json_message.type;
        console.log(tip);
        var durum_kul = false;

        if (tip == "onur1234") {
            var my_cl_obj = new Object();
            my_cl_obj.data = json_message;
            my_cl_obj.con = socket;

            for (var i = 0; i < client_sockets.length; ++i) {
                if (client_sockets[i].data.user_id == my_cl_obj.data.user_id) {
                    ////kullanici mevcut///
                    durum_kul = true;

                    if ((my_cl_obj.data.cafe_durum == "yok_farklı_var" || my_cl_obj.data.cafe_durum == "yok_farkli_var") && 
			client_sockets[i].data.cafe_id != my_cl_obj.data.cafe_id) {
                        ////diger cafelere_bildirim yolla//// 
                        for (var i3 = 0; i3 < cafe_sockets.length; ++i3) {
                            if (cafe_sockets[i3].cafe_id == client_sockets[i].data.cafe_id) {
                                for (var i4 = 0; i4 < cafe_sockets[i3].cafe_array.length; ++i4) {
                                    cafe_sockets[i3].cafe_array[i4].con
					    .emit(cafe_sockets[i3].cafe_id + "_cafe_degisti", client_sockets[i].data.user_id);
                                }
                            }
                        }
                    }

                    client_sockets[i] = my_cl_obj;
			
                }
            }
            if (durum_kul == false) {
                client_sockets.push(my_cl_obj);
            }

            if (my_cl_obj.data.cafe_durum == "yok_farklı_var" || my_cl_obj.data.cafe_durum == "yok_farkli_var") {
                /////ilk oturum başka cefede var///
                for (var i6 = 0; i6 < cafe_sockets.length; ++i6) {
                    if (cafe_sockets[i6].cafe_id == my_cl_obj.data.cafe_id) {
                        for (var i7 = 0; i7 < cafe_sockets[i6].cafe_array.length; ++i7) {
                            cafe_sockets[i6].cafe_array[i7].con
				    .emit(cafe_sockets[i6].cafe_id + "_oturum_acildi", my_cl_obj.data.user_id);
                        }
                    }
                }
            }
            if (my_cl_obj.data.cafe_durum == "yok_farklı_yok" || my_cl_obj.data.cafe_durum == "yok_farkli_yok") {
                ////ilk oturum////
                for (var i6 = 0; i6 < cafe_sockets.length; ++i6) {
                    if (cafe_sockets[i6].cafe_id == my_cl_obj.data.cafe_id) {
                        for (var i7 = 0; i7 < cafe_sockets[i6].cafe_array.length; ++i7) {
                            cafe_sockets[i6].cafe_array[i7].con
				    .emit(cafe_sockets[i6].cafe_id + "_oturum_acildi", my_cl_obj.data.user_id);
                        }
                    }
                }
            }
            if ((my_cl_obj.data.cafe_durum == "var_farklı_yok_masa" || my_cl_obj.data.cafe_durum == "var_farkli_yok_masa") ||
		(my_cl_obj.data.cafe_durum == "var_farklı_var_masa" || my_cl_obj.data.cafe_durum == "var_farkli_var_masa")) {
                ////masa degis/////
                for (var i6 = 0; i6 < cafe_sockets.length; ++i6) {
                    if (cafe_sockets[i6].cafe_id == my_cl_obj.data.cafe_id) {
                        for (var i7 = 0; i7 < cafe_sockets[i6].cafe_array.length; ++i7) {
                            cafe_sockets[i6].cafe_array[i7].con
				    .emit(cafe_sockets[i6].cafe_id + "_masa_degisti", my_cl_obj.data.user_id);
                        }
                    }
                }
            }

        } else if (tip == "onur1234siparis") {

            var my_cl_obj = new Object();
            my_cl_obj.data = json_message;
            my_cl_obj.con = socket;
	    orders.push(my_cl_obj.data.siparisler)
	    console.log(orders)

            for (var i6 = 0; i6 < cafe_sockets.length; ++i6) {
                if (cafe_sockets[i6].cafe_id == my_cl_obj.data.cafe_id) {
                    for (var i7 = 0; i7 < cafe_sockets[i6].cafe_array.length; ++i7) {
                        cafe_sockets[i6].cafe_array[i7].con
				.emit(cafe_sockets[i6].cafe_id + "_siparis_verildi", my_cl_obj.data.user_id);
                    }
                }
            }
        }
	    
        console.log('New Chat Message ', msg);
       //// io.sockets.emit('txt', msg);
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
