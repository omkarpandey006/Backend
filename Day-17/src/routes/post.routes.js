const express = require("express")
const postRouter = express.Router() // call to router 
const postControll = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")


/**
 * post/ api/post [protected]
 * req.body = {caption ,image-file}
 * main post -- /api/post/
 */

postRouter.post("/",upload.single("image") ,identifyUser, postControll.createPostController)

// GET -- /api/posts/
postRouter.get("/",identifyUser,postControll.getpostController)


/**
 *GET -- /api/posts/details/:postid
 *return an detail about specific post with the id. also check whether the post belongs to the user that the request come from..
 */
 postRouter.get("/details/:postId",identifyUser,postControll. getpostDetailController)



module.exports = postRouter