
io.on('connection', (socket) => {
    console.log('A user connected');

   socket.on('join', (room)=>{
    socket.join(room)
    console.log(`User joined room ${room}`);
   })
   socket.on('message', ({user,room, message})=>{
    io.to(room).emit('message', { user, message });
     console.log(user, room, message)
   })

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
