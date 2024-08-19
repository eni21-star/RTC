const { io } = require('socket.io-client');

// Connect to the Socket.IO server
const socket = io('http://localhost:3001/chat');
const name = 'eniola'
const group = 'gang'

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('join',({room:"room1", user_name: "Alice"}));
   
    // Send a message to the server
    socket.emit('message',({room:"room1", user_name: "Alice", message:"balabluee"}));

    
    // Listen for messages from the specific room
    socket.on('message', (mesg) => {
        console.log(mesg);
    });
    
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});
