let socket = io();

socket.on('connect', function () {
    console.log('Connected to server');


});

//fist argument on socket.on is the name of the "emitter reciever". Call the argument
//To send it over to where the argument originally exists.

socket.on('newMessage', function( message ) {
    console.log('newMessage', message);
})
  

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

