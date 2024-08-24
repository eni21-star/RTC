const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    room:
    {
        type: String,
        required : true,
        ref: 'rooms'
        
    },
    sender: {
        type: Number,
        ref: 'users'
    },
    message: {
        type: String
    }

}, {
    timestamps: true
})

const messageModel = mongoose.model('messages', schema)
module.exports = messageModel
   