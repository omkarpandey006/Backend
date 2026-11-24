const express = require("express")
const postRouter = express.Router() // call to router 
const postControll = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})


/**
 * post/ api/post [protected]
 * req.body = {caption ,image-file}
 * main post -- /api/post/
 */

postRouter.post("/",upload.single("image") , postControll.createPostController)




module.exports = postRouter