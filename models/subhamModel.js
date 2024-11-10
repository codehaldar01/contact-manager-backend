const mongoose = require('mongoose')

const subhamSchema =  mongoose.Schema({
    name: {
        type: String,
        require:[true, "Enter Subham"]
    },
    Work:{
        type: String,
        require:[true, "Software Development Engineer"]
    }
})

module.exports = mongoose.model("Subham", subhamSchema)