const User = require("../models/User")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/accountToken")

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

const register = async (req, res) => {

    const { name, email, password } = req.body
    const round = 10

    try {
        let isEmail = await User.findOne({ email: email })
        if (isEmail) await res.status(400).json({
            errors: [{
                msg: `This ${ email } Already Exists`
            }]
        })

        const user = new User({ name, email, password })
        const salt = await bcrypt.genSalt(round)
        user.password = await bcrypt.hashSync(password, salt)
        await user.save()

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password
        }

        //generate token after successfully create account
        generateToken(res, payload)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }

}

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if(!user)  return res.status(400).json({
            errors: [{
                msg: `This ${ email } Is Invalided ...`
            }]
        })
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) return res.json({
            errors: [{
                msg: "Password does not Match our Record"
            }]
        })

        res.json({
            message: "Login successfully",
            data: user
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
}

const getUserByToken = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password")
        await res.json(user)

    } catch(error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}

module.exports = {

    index,
    register,
    login,
    getUserByToken

}

//link reference; https://www.javaguides.net/2020/02/nodejs-express-and-mongodb-restful-crud-api-tutorial.html

//https://dev.to/gethackteam/from-higher-order-components-hoc-to-react-hooks-2bm9
//https://www.freecodecamp.org/news/how-to-develop-your-react-superpowers-with-the-hoc-pattern-61293651d59/
//https://www.freecodecamp.org/news/react-superpowers-container-pattern-20d664bdae65/
//https://codeforgeek.com/refresh-token-jwt-nodejs-authentication/