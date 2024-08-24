const pool = require("./config/dbConfig");
const http = require('http')
const app = require('./app.js')
const server = http.createServer(app)
const mongoose = require('mongoose')
const { Server } = require('socket.io');
const jwtVerify = require("./src/middleware/jwtVerify.js");
const jwt = require('jsonwebtoken');
const chatRepo = require("./repositories/Chat/chatRepo.js");



const env = require('dotenv').config()



pool.connect().then(() => {
    console.log("connected to postGres")
    mongoose.connect("mongodb://localhost:27017/chatApp")
        .then(() => {
            console.log("connected to MOngoDB")
            server.listen(process.env.PORT, () => {
                console.log(`server is running on ${process.env.PORT}`);
            });
        })
        .catch(() => {
            console.log("error connecting to MongoDB")
        })
})
    .catch(() => {
        console.log("error connecting to Postgres")
    })
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

 io.of('/draw').
 use((socket, next) => {
    const headers = socket.handshake.headers.authorization;
   
    if (!headers) {
        return next(new Error('Authentication error'));
    }
    const token = headers.split(" ")[1]
   

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
        if (err) {
            return next(new Error('invalid token'))
        }
        socket.user = user
        next()
    })
}).on('connection', (socket) => {
    const namespace = socket.nsp
    console.log(`Namespace: ${namespace}`);
    console.log(socket.user)

   

    socket.on('join', async (data) => {

        const { room } = data;
        let roomExists = await chatRepo.roomExist(room)
        
        if (!roomExists) {
           
            roomExists = new roomModel({ room: room, user_ids: socket.user.id });
            await roomExists.save();
            console.log(`Created new room: ${room}`);
        }
        else
        {
            let userInRoom = await chatRepo.Userinroom(socket.user.id, room)
            console.log(userInRoom)
            if(!userInRoom)
            {
            await chatRepo.newroomUser(socket.user.id, room)
             console.log(`new user added to room ${room}`)
            }
        }

        socket.join(room)
        io.of('/draw').to(room).emit('message', `${socket.user.username}: has joined the chat`)
    })
    socket.on('message', async (data)=>{
        
        const { room, message } = data
        let userInRoom = await chatRepo.Userinroom(socket.user.id, room)
        
        if (!userInRoom) {
           
            socket.emit('error', 'You are not a member of this room, please join first');
            return;
        }
        io.of('/draw').to(room).emit('message', `${socket.user.username} : ${message}`)
      
    })

   
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
});
