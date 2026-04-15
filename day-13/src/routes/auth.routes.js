const express = require("express");

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

const authRouter = express.Router();

const userModel = require("../models/user.models");

authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const is_user_already_exist = await userModel.findOne({ email });

    if(is_user_already_exist) {
        return res.status(409).json({
            message: "user already exist with this email"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = userModel.create({
        name, email, password:hash
    })

    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "user successfully registered",
        user, token
    })
})

authRouter.get("/get-me", async (req, res)  => {

})


module.exports = authRouter;