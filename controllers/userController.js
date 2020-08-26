const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const validator = require("validator")


const index = (req, res) => {

    User.find()
        .then(users => {
            res.send(users)
        }).catch(error => {
            res.status(500).send({
                message: error.message || "No users found ..."
            })
    })

}

const login = (req, res) => {

     //validate user
     if (!req.body.name) {
         return res.status(400).send({
             message: "User name cannot be empty!"
         })
     }


     if (!validator.isEmail(req.body.email)) {
         return res.status(400).send({
             message: "E-mail is invalid",
         })
     }

     if (req.body.password.length < 8 || req.body.password.length === 0) {
         return res.status(400).send({
             message: "Password is invalid, or at least 8 chars",
         })
     }

     //store user
     const user = new User({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password
     })

     //saving user into Database
     user.save()
         .then(data => {
             res.send(data)
         }).catch(error => {
             res.status(500).send({
                 message: error.message || "user cannot be saved ..."
             })
         })
    

}

//To Do: https://github.com/LinusMuema/node-authentication-api/tree/mvc


module.exports = {

    index,
    login

}

//link reference; https://www.javaguides.net/2020/02/nodejs-express-and-mongodb-restful-crud-api-tutorial.html