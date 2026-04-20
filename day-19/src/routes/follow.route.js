const express = require("express");

const followRouter = express.Router();

const identifyUser = require("./../middleWares/auth.identifyUser");

const userRequest = require("./../controllers/follow.controller")

followRouter.post("/follow/:username", identifyUser, userRequest.followController);

followRouter.post("/unfollow/:username", identifyUser, userRequest.unfollowController);

module.exports = followRouter;