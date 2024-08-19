const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    user_ids: {
        type: Array,
        required : true,
        ref: 'users'
    }, 
   room:
    {
        type: String,
        required : true,
        
    },
    message: {
        type: String
    }
})

const messageModel = mongoose.model('messages', schema)
module.exports = messageModel