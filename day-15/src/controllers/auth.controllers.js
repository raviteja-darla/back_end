const userModel = require("../models/user.models")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

async function registerController (req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const is_user_already_exist = await userModel.findOne({
        $or: [
            { username }, { email } 
        ]
    });

    if( is_user_already_exist ) {
        return res.status(409).json({
            message: "user already exist" + ( is_user_already_exist.email == email ? "Email already exist" : "username already exist")
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username, email, password:hash, bio, profileImage
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d"});

    res.cookie("token", token);

    res.status(201).json({
        message: "user successfully registered",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
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
            message: "account not found with this details"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    const is_password_valid = hash === user.password;

    if( !is_password_valid ){
        return res.status(401).json({
            message: "entered invalid password"
        })
    };

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });

    res.cookie("token", token);

    res.status(200).json({
        message: "user logedin successfully",
        user: {
            username: user.username,
            email: user.email,
            bio: user.body,
            profileImage: user.profileImage
        }
    })
}

module.exports = { registerController, loginController };