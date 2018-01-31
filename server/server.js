const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
let app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    console.log('New user connected');

    socket.emit('newMessage', generateMessage( 'admin', 'welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'player one has entered the fray'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage( message.from, message.text));
        callback('This is from the server.');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });


    });
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})


server.listen(port, () => {
    console.log(`port ${port}`);
})