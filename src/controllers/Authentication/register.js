const authentication = require("../../../services/Authentication/authServices")


const registerController = async (req, res) => {

    const message = await authentication.register(req.body)
    return res.status(message.status).json(message)

}
module.exports = registerController
