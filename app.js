const express = require('express');
const app = express()
app.use(express.json());
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))






const loginRouter = require('./src/routes/authentication/Login');
const registerRouter = require('./src/routes/authentication/register');
const jwtVerify = require('./src/middleware/jwtVerify');
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001');


// app.post('/chat/:id', jwtVerify ,(req,res)=>{
//  // console.log(req.cookies.accesstoken)
//   const { message } = req.body
//   console.log(message)
//   const { id } = req.params
//   const user = req.user
  

//  socket.emit('join', id,user.username)
//  socket.emit('message', id, user.username, message)

 
// })



app.use('/register', registerRouter)
app.use('/login', loginRouter)

module.exports = app