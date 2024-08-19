const authentication = require("../../../services/Authentication/authServices")


const loginController = async (req, res) => {

    const login = await authentication.login(req.body)
    if(login.status == 404 || login.status ==500)
    {
       return res.status(login.status).json(login)
       
    }
    res.cookie('accesstoken', login.accesstoken, { httpOnly: true, secure: false })
    res.cookie('refreshtoken', login.refreshtoken, { httpOnly: true, secure: false })

   return res.status(login.status).json(login)
}
module.exports = loginController