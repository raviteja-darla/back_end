const express = require("express");

const authRouter = express.Router();

const crypto = require("crypto")

const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const is_user_already_exist = await userModel.findOne({ email });

    if(is_user_already_exist) {
        return res.status(409).json({
            message: "user already exist with this email"
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    const user = await userModel.create({
        name, email, password:hash
    });

    const token = jwt.sign({
        id : user._id,
        email : user.email
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "new user registered successfully",
        user,
        token
    })
})

authRouter.get("/get-me", async (req, res) => {

    try{
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({
                message: "Unauthorized - No token"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decode.id);

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.json({
            name: user.name,
            email: user.email
        });
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expried token"
        })
    } 
    
})

module.exports = authRouter;