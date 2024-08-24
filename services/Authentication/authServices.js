const AuthServices = require("../../repositories/Authentication/AuthServices");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
class authentication{

    async register(user){
       try {
        const emailExist = await AuthServices.findByemail(user.email)
        if(emailExist)
        {
           return { message: "email aready exist", status: 409}
        }

        const password = await bcrypt.hash(user.password, 10)
        user.password = password
       const  {newUser}  = await AuthServices.CreateUser(user)
       console.log(newUser)
        if(!newUser)
        {
            return { message: "error creating user", status: 500}
        }
        
        return { message: newUser, status: 201}
       } catch (error) {
        return { message: error.message , status: 500}
       }
    }
   async login(user)
   {
    const userExist = await AuthServices.findByemail(user.email)
    if(!userExist)
    {
        return { message: "user does not exist", status: 404}
    }
    const {User} = await AuthServices.fetchUser(user)
  
    if(!user)
    {
        return { message: "login error", status: 500}
    }
    const comparepassWord = await bcrypt.compare(user.password, User.password)
    if(!comparepassWord)
    {
        return { message: "incorrect password", status: 401}
    }
    const payload = {
        id: User.id,
        username: User.username
    }
    const accesstoken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '1hr'}) //dont forget to change bck to 15 min
    const refreshtoken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '7d'})

    return {accesstoken, refreshtoken, status: 200}

   }










}
module.exports = new authentication()
