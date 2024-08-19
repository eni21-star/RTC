const loginController = require('../../controllers/Authentication/Login')
const router = require('express').Router()


router.post('/' , loginController)

module.exports = router