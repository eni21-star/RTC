const registerController = require("../../controllers/Authentication/register");
const router = require('express').Router()


router.post('/' ,registerController)

module.exports = router