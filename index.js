
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const bodyParser = require("body-parser")
const chalk = require("chalk")
const cors = require("cors")
const connectDb = require("./config/databaseConnection")
const userRoute = require("./routes/user")

//create express app
const app = express()

//connect to MongoDB
connectDb()

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(express.json({extended: true}));
app.use(bodyParser.json())  // parse application/json
app.use(cors())


//testing route
app.get('/', (req, res) => {
    res.json({
        message: chalk.blue("welcome to our Homepage")
    })
})

app.use("/user", userRoute) //user route within controller

//set Port for Server
const PORT = process.env.PORT || 5000

// listen for requests
app.listen(PORT, () => {
    console.log(`server starts on Port ${PORT}`)
})