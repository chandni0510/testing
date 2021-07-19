var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');
  var clients =[]; 
// sender will send latitude and longitude
app.get('/',function(req,res){
    res.send("Welcome to my socket");
});

app.get('/sender', function(req, res) {
   res.sendfile('sender.html');
});

io.on('connection', function(socket) {	 
console.log('user Online'+socket.id);
socket.on('disconnect', function (data) { });   


socket.on('sender', function(data) {
request("https://networkbook.co/networkbook/api/send_message?sender_id="+data.sender+"&receiver_id="+data.receiver+"&message="+data.message+"&user_name="+data.user_name);
console.log('data',data);
io.sockets.emit('receiver',data);
});  

socket.on('SenderById', function(data) {
request("https://networkbook.co/networkbook/api/send_message?sender_id="+data.sender+"&receiver_id="+data.receiver+"&message="+data.message+"&user_name="+data.user_name+"&sender_name="+data.sender_name+"&sender_image="+data.sender_image+"&receiver_image="+data.receiver_image+"&receiver_name="+data.receiver_name);

console.log('data11111',data);
io.sockets.emit('ReceiverById'+data.receiver,data);
});  

 socket.on('receiver', function(data){
     console.log(data);    
     io.sockets.emit('sender',data);
   });
});

http.listen(process.env.PORT || 5000, function(){
  console.log('listening on', http.address().port);
});