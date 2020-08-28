const jsonWebToken = require("jsonwebtoken")
const config = require("config")

const generateToken = (res, payload) => {

    const signOption = {
        expiresIn: "288000",
        algorithm: "HS384"
    }

    jsonWebToken.sign(payload, config.get("jwtSecret"), signOption, (error, token) => {
        if(error) throw error
        res.json({
            message: "Valid Credential",
            accountToken: token
        })
    })



}

module.exports = generateToken