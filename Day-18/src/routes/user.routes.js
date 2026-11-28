const express = require("express")
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


const userRouter = express.Router()
/**
 * @route post -- /api/users/follow/:userid
 * @description follow a user 
 * @access private
 */
userRouter.post("/follow/:username",identifyUser,userController.followUserController)

/**
 * @routes post -- /api/users/unfollow/:userid
 * @description unfollow a user
 * @ access Private
 */
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)




module.exports = userRouter;