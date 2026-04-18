const postModel = require("./../model/posts.model");

const ImageKit = require("@imagekit/nodejs");

const { toFile } = require("@imagekit/nodejs")

const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
    private_key : process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req, res) {
    const token = req.cookies.token;

    if( !token ) {
        return res.status(401).json({
            message: "Token not provided, unauthorized access"
        })
    };

    let decoded = null;

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "unauthorized access"
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: 'Test',
        folder: "posts"
    })
    
    const post = await postModel.create({
        caption: req.body.caption,
        img_url: file.url,
        userId: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post: {
            caption: post.caption,
            img_url: post.img_url,
            userId: post.userId
        }
    })
}

module.exports = {
    createPostController
}