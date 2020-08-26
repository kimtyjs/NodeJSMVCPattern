const mongoose = require("mongoose")
const config = require("config") //is a library
const databaseRemoteURL = config.get("mongoURL")

const connectDB = async () => {

    let databaseConfig = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }

    try {
        await mongoose.connect(databaseRemoteURL, databaseConfig)
        console.log("MongoDB has successfully Connected ...")
    } catch (error) {
        console.log("Database Connection failure", error.message)
        process.exit(1)
    }

}

module.exports = connectDB