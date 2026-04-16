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


module.exports = { registerController, loginController };