const config = require("config")
const jsonWebToken = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

    const token = req.header("x-auth-token")
    if(!token) return res.status(401).json({
        msg: "No Token, Authentication denied ..."
    })

    try {
        const decodedToken = jsonWebToken.verify(token, config.get("jwtSecret"))
        req.user = decodedToken.user
        next()
    } catch (error) {
        res.status(401).json({
            msg: "Invalided Token"
        })
    }



}

module.exports = verifyToken