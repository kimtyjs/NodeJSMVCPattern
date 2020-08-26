const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")


//get all user
router.get('/all', userController.index)

//create user
router.post('/create', userController.login)

module.exports = router