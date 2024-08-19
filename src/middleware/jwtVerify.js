const jwt = require('jsonwebtoken')
const env = require('dotenv').config()


const jwtVerify = ( req, res, next)=>
    {
        
        const cookie = req.headers.authorization
        console.log(cookie)
        if(!cookie)
        {
           return res.status(401).json({message: "please login to continue"})
        }
        jwt.verify(cookie, process.env.ACCESS_SECRET_KEY, (err, user)=>{
            if(err)
            {
                return res.status(401).json("unathorized, invalid cookie")
            }
            req.user = user
            next()
        })
    }

    module.exports = jwtVerify