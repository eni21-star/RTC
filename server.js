const pool = require("./config/dbConfig");
const http = require('http')
const app = require('./app.js')
const server = http.createServer(app)
const mongoose = require('mongoose')
const { Server } = require('socket.io');
const messageModel = require("./model/messages.js");
const jwtVerify = require("./src/middleware/jwtVerify.js");

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

const chatNamespace = io.of('/chat');
chatNamespace.use(jwtVerify)
chatNamespace.on('connection', (socket) => {
 //   console.log('New client connected', socket.id);


    socket.on('join', (data) => {
        const { room, user_name } = data;
        socket.join(room)
        console.log(`new user in room ${user_name}`)
        socket.to(room).emit('message',(` user ${user_name} has joined the chat`))

    });

    socket.on('message', (data)=>{
        const { room, user_name, message} = data;
      socket.to(room).emit('message',(`${user_name}: ${ message }`))
    })

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
});
