const express = require("express")
const userModel = require("../model/user.model")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")



const authRouter = express.Router()

authRouter.post("/register",async(req ,res)=>{
    const {name , email , password} = req.body
// CHECK FOR EMAIL...

    const isUserAlreadyExists = await userModel.findOne({ email })
 
    
    if(isUserAlreadyExists ){ 
        return res.status(400).json({
            message: "user already exists with this email"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")
// task 409 study 
    const user = await userModel.create({
        email,name, password:hash,
    })

    const token = jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        process.env.JWT_SECRET
    )
  res.cookie("jwt_token",token)



    res.status(201).json({
        message: "user registered",
        user,
        token
    })
})

// api / auth/protected -- post - dummy 
// server access -- to req.cookies...
authRouter.post("/protected" , (req ,res)=>{
    console.log(req.cookies);

    res.status(200).json({
        message:"this is a protected route"

    })
    
})


// login - api /auth/login -- post 
authRouter.post("/login", async (req ,res)=>{
    const{email , password } = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"user not found with this email"
        })
    }
    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid password"
        })
    }


    const token = jwt.sign({
        id:user._id,
        
    }, process.env.JWT_SECRET)

    res.cookie('jwt_token',token)

    res.status(200).json({
        message:"user logged in successfully",
        user
    })
})


module.exports = authRouter