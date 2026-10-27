const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true , "username already existed"],
        required:[true, "username is required"]

    },
    email:{
        type:String,
        unique:[true, "email already existed"],
        required:[true, "email is required"],

    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/omadysri/default%20user.jpg"
    }
})


const userModel = mongoose.model("users",userSchema)



module.exports = userModel