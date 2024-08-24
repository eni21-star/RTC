const { io } = require('socket.io-client');
const yourJWTTokenHere = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDEsInVzZXJuYW1lIjoiZW5pb2xhc2tpIiwiaWF0IjoxNzI0NTEzMjc2LCJleHAiOjE3MjQ1MTY4NzZ9.iyHK4PjPjYU5Yov3KsVtqMHzc9qxRUbaI1ud35QEyEs"
// Connect to the Socket.IO server
const socket = io('http://localhost:3001/draw', {
    extraHeaders: {
        Authorization: `Bearer ${yourJWTTokenHere}` // Replace with the actual JWT token
    }
}
);
const name = 'eniola'
const group = 'gang'

socket.on('connect', () => {
    console.log('Connected to server');
  
    socket.emit('join', {"room": "room2"} )
    socket.emit('message',{room:"room2",  message:"balabluee"}
);

    
    socket.on('error', (mesg) => {
        console.log(mesg);
    });
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
