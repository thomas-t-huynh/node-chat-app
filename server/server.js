const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
let app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'Pauleen',
        text: 'Hola',
        createdAt: 27
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage ', message)
    });
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
})


server.listen(port, () => {
    console.log(`port ${port}`);
})