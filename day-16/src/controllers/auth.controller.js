const userModel = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController (req, res) {
    const { username, email, password, bio, profile_img } = req.body;

    const is_user_already_exist = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if( is_user_already_exist ) {
        return res.status(409).json({
            message: "user already exist" + ( is_user_already_exist.email == email ? "Entered email already exist" : "Entered username already exist" )
        });
    };

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username, email, password:hash, bio, profile_img
    });

    const token = jwt.sign({
        id : user._id,
        email : user.email
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    res.cookie = ("token", token);

    res.status(201).json({
        message: "user registered successfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_img: user.profile_img
        }, 
        token
    })
}

async function loginController (req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: username }, { email: email }
        ]
    });

    if( !user ){
        return res.status(409).json({
            message: "user not found"
        })
    };

    const is_password_valid = await bcrypt.compare(password, user.password);

    if( !is_password_valid ){
        return res.status(401).json({
            message: "invalid password"
        })
    };

    const token = jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET, {
        expiresIn : "1d"
    });

    res.cookie("token", token);

    res.status(200).json({
        message: "user logedin successfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profile_img: user.profile_img
        }, 
        token
    })
}

module.exports = {
    registerController,
    loginController
}
