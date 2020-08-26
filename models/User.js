const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true })

const User = mongoose.model("users", UserSchema)
module.exports = User

