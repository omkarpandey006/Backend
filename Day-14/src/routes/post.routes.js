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

// GET -- /api/posts/
postRouter.get("/",postControll.getpostController)


/**
 *GET -- /api/posts/details/:postid
 *return an detail about specific post with the id. also check whether the post belongs to the user that the request come from..
 */
 postRouter.get("/details/:postId",postControll. getpostDetailController)



module.exports = postRouter