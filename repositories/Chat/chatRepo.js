const pool = require("../../config/dbConfig");
const userModel = require("../../model/userModel");
const roomModel = require('../../model/roomModel')

class chatServices {

    async roomExist(room) {
        let roomExists = await roomModel.findOne({ room: room });
        if (!roomExists) {
            return false
        }
        return true
    }

    async Userinroom(id, room) {
        let roomExists = await roomModel.findOne({ room: room });
        let userInRoom = await roomExists.user_ids.includes(id)
        if (!userInRoom) {
            return false
        }
        return true
    }

    async newroomUser(id, room) {
        let roomExists = await roomModel.findOne({ room: room });
        await roomExists.user_ids.push(id)
        await roomExists.save();
    }

}

module.exports = new chatServices()