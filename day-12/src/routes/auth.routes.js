const express = require("express")

const userModuel = require("../models/user.module")

const jwt = require("jsonwebtoken");

const authRouter = express.Router() // AuthRouter is used to create any API in other file other than app.js

authRouter.post('/register', async (req, res) => {
    const { email, name, password } = req.body

    try {
        const isUserAlreadyExist = await userModuel.findOne({ email })

        const user = await userModuel.create({ // Creating new user with Data
            email, password, name
        });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SCRET
        )

        res.status(201).json({
            message: "New user register successfully",
            user, token
        })

        res.cookie("jwt_token", token)

    } catch(err) {
        err: res.status(400).json({
            message: `User already exist with this ${email} id...`
        })
    };
})


module.exports = authRouter;
