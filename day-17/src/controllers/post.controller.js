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
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

async function getPostController(req, res){
    const token = req.cookies.token

    let decoded = null 

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Token Invalid"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    });

    console.log(posts)

    res.status(200).json({
        message: "post feteched successfully",
        posts  
    })
}

async function getPostdetailsController (req, res){
    const token = req.cookies.token

    let decoded = null;
    
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            message: "Token Invalid"
        })
    };

    const userId = decoded.id;
    const { postId } = req.params
    const post = await postModel.findById( postId )

    if( !post ){
        return res.status(404).json({
            message: "Post Not Found"
        })
    }

    const is_valid_user = post.user.toString() === userId;

    if( !is_valid_user ) {
        return res.status(403).json({
            message: "Forbedden Content"
        })
    }

    return res.status(200).json({
        message: "post feteched successfully",
        post 
    })

}

module.exports = {
    createPostController,
    getPostdetailsController,
    getPostController
}