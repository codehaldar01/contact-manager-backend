const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "please enter a username"]
    },
    email: {
        type: String,
        require: [true, "enter the email"],
        unique: [true, "Don't use same email for multiple users"]
    },
    password: {
        type: String,
        require: [true, "please enter your password"]
    }
})

module.exports = mongoose.model("User", userSchema);