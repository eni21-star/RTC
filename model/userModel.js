const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    user_id: {
        type: Number,
        required : true,
        unique: true
    }
})

const userModel = mongoose.model('users', schema)
module.exports = userModel