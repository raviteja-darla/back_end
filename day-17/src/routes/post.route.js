const express = require('express');

const postRouter = express.Router();

const postController = require("./../controllers/post.controller");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const identify_middleWare = require("./../middleWares/auth.identifyUser")

//POST => http://localhost:3000/api/posts/
postRouter.post('/post', upload.single("img_url"), identify_middleWare, postController.createPostController);

//GET => http://localhost:3000/api/posts/
postRouter.get('/', identify_middleWare,  postController.getPostController)

//GET => http://localhost:3000/api/posts/details/:?
postRouter.get('/details/:postId', identify_middleWare,  postController.getPostdetailsController)

module.exports = postRouter;