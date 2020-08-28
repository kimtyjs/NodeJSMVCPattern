const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const verifyToken = require("../middlewares/verifyToken")

//get all user
router.get('/all', userController.index)

//create user
router.post('/register', userController.register)

//login user
router.post('/login',userController.login)

//login via token
router.get('/token', verifyToken, userController.getUserByToken)

module.exports = router