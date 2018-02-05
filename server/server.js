const path = require('path');
const http = require('http');


const express = require('express');
const socketIO = require('socket.io');

const {generateMessage , generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
let app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    
    console.log('New user connected');

    



    socket.on('join', (params , callback) => {

        let nameCheck = users.checkUser(params.name);

        console.log(nameCheck);      

        if (nameCheck) {
            return callback('User name already exists. Please enter a different one.')
        }

        let room = params.room.toLowerCase();

        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(room);
        
        users.removeUser(socket.id);
  
        users.addUser(socket.id , params.name, room);

        io.emit('updateRoomList', users.getRooms());

        console.log(users.getRooms());

        io.to(room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage', generateMessage( 'admin', 'welcome to the chat app'));

        socket.broadcast.to(room).emit('newMessage', generateMessage('admin', `${params.name} has joined.`));
        
        callback();
    })

    socket.on('createMessage', (message, callback) => {
        
        let user = users.getUser(socket.id);

        let room = user.room.toLowerCase();

        if (user && isRealString(message.text)) {
             io.to(room).emit('newMessage', generateMessage(user.name, message.text));
        }
       
        callback();
    });

    socket.on('createLocationMessage', (coords) => {

        let user = users.getUser(socket.id);

        let room = user.room.toLowerCase();

        if (user) {
             io.to(room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude , coords.longitude))
        }
        
    })
    

    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id);

        

        if (user) {
            let room = user.room.toLowerCase();
            io.emit('updateRoomList', users.getRooms());
            io.to(room).emit('updateUserList', users.getUserList(room));;
            io.to(room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
        console.log('User disconnected');
    })
})


server.listen(port, () => {
    console.log(`port ${port}`);
})