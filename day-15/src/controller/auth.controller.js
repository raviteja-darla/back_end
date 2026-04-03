const userModel = require("../models/user.model")

const crypto = require("crypto")

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken");

async function registerController (req, res) {
    const { username, email, password, bio, profileImage } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username }, { email }
        ]
    });
    if(isUserAlreadyExist) {
        return res.status(409).json({
            message:
                "user already exist with this " + 
                (isUserAlreadyExist.email == email ? "Email Id" : "username")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn : '1d' });

    res.cookie("token", token)

    res.status(201).json({
        message : "user register successfull",
        user : {
            username        : user.username,
            email           : user.email,
            bio             : user.bio,
            profileImage    : user.profileImage
        }
    })
}

async function loginController (req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or : [
            { username }, { email }
        ]
    })
    if(!user){
        return res.status(404).json({
            message: "Please check your " + (isUserRegister.email == email ? "Email" : "Username")
        })
    }
    // const hash = crypto.createHash('sha256').update(password).digest('hex');
    
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if(!isPasswordValid) {
        return res.status(401).json({
            message: "user password invalid"
        })
    }
    const token = jwt.sign(
        {id: user._id}, 
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    res.cookie("token", token);

    res.status(201).json({
        message: "user loggined successfully",
        user : {
            username        : user.username,
            email           : user.email,
            bio             : user.bio,
            profileImage    : user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController,
}