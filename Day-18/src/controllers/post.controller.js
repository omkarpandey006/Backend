const postModel = require("../model/post.model")
const ImageKit = require("@imagekit/nodejs/index.js")
const {toFile} = require("@imagekit/nodejs/index.js")
const jwt = require("jsonwebtoken")
const likeModel = require("../model/like.model")

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})



async function createPostController(req ,res){


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
        user:req.user.id

    })
    res.status(201).json({
        message:"post created successfully.",
        post
    })
}

async function getpostController(req ,res){

    const userId = req.user.id
    const posts = await postModel.find({
        user:userId
    })
    res.status(200).json({
        meassage:"posts fetched successfully.",
        posts
    })
}

async function getpostDetailController(req ,res){
    const userId = req.user.id
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
async function likepostController(req, res){
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found."
        })
    }
    const like = await likeModel.create({
        post:postId,
        user:username
    })
    res.status(200).json({
        message:"post liked successfully.",
        like
    })
}


module.exports = {
    createPostController,
    getpostController,
    getpostDetailController,
    likepostController
}