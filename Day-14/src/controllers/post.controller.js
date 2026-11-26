const postModel = require("../model/post.model")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})



async function createPostController(req ,res){

    console.log(req.body,req.file);


const token = req.cookies.token

if(!token){
    return res.status(401).json({
        message:"Token Not provided , unauthorized access"
    })
}

let decoded = null
try{
     decoded = jwt.verify(token , process.env.JWT_SECRET)
}catch(err){
    return res.status(401).json({
        message:"user not authorize"
    })
}

console.log(decoded);

    const file = await imagekit.files.upload
    ({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"Test",
        folder:"insta-clone-post"
    })

    // res.send(file)
    const post = await postModel.create({
        caption:req.body.caption,
        imgUri:file.url,
        user:decoded.id

    })
    res.status(201).json({
        message:"post created successfully.",
        post
    })
}

async function getpostController(req ,res){

    const token = req.cookies.token

     if(!token){
        return res.status(401).json({
            message:"unAuthorized Access"
        })
     }

    let decoded;
    try{
         decoded = jwt.verify(token , process.env.JWT_SECRET)
    }catch(err){
      return res.status(401).json({
      message:"token invalid"
   })
    }

    const userId = decoded.id
    const posts = await postModel.find({
        user:userId
    })
    res.status(200).json({
        meassage:"posts fetched successfully.",
        posts
    })
}

async function getpostDetailController(req ,res){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unAuthorized Access"
        })
    }
    let decoded 

    try{
    decoded = jwt.verify(token , process.env.JWT_SECRET)
    }catch(err){
     return res.status(401).json({
        message:"invalid Token"
     })
    }
    const userId = decoded.id
    const postId =req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
        message:"posts does not found"
    })
  }


  const isValidUser = post.user.toString() === userId

  if(!isValidUser){
    return res.status(403).json({
        message:"forbidden content"
    })
  }

  return res.status(200).json({
    message:"post fetched successfully.",
    post
  })

}


module.exports = {
    createPostController,
    getpostController,
    getpostDetailController
}