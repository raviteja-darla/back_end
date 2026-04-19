const express = require('express');

const postRouter = express.Router();

const postController = require("./../controllers/post.controller");

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

//POST => http://localhost:3000/api/posts/
postRouter.post('/', upload.single("img_url"), postController.createPostController);

//GET => http://localhost:3000/api/posts/
postRouter.get('/', postController.getPostController)


postRouter.get('/details/:postId', postController.getPostdetailsController)

module.exports = postRouter;