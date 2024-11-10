const { Timestamp } = require('bson');
const mongoose = require('mongoose')


const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    name:{
        type: String,
        require:[true, "Please enter your name"]
    },
    email:{
        type: String,
        require:[true, "Please enter your email"]
    },
    phone:{
        type: String,
        require:[true, "Please enter your phone no."]
    },
},{
    Timestamp: true
})

module.exports=mongoose.model("Contact", contactSchema);