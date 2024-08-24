const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    room:
    {
        type: String,
        required : true,
        unique: true
        
    },
   
    user_ids: {
        type: Array,
        ref: 'users'
    }
})

const roomModel = mongoose.model('rooms', schema)
module.exports = roomModel