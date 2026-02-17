const express = require("express");

const userModuel = require("../models/user.module");

const jwt = require("jsonwebtoken");

const authRouter = express.Router();

const crypto = require("crypto");

// POST  => /api/auth/register
authRouter.post('/register', async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const isUserAlreadyExist = await userModuel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(400).json({
                message: `User already exists with this ${email} id`
            });
        }

        const hash = crypto.createHash("md5").update(password).digest("hex");

        const user = await userModuel.create({
            email, password: hash, name
        });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET
        );

        // ✅ set cookie BEFORE response
        res.cookie("jwt_token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax"
        });

        res.status(201).json({
            message: "New user registered successfully",
            user,
            token
        });

    } catch (err) {
        console.error("REGISTER ERROR:", err); // 👈 ADD THIS
        res.status(500).json({
            message: "Server error"
        });

    }
});

// POST  => /api/auth/login
authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUserRegistered = await userModuel.findOne({ email });

        if (!isUserRegistered) {
            return res.status(404).json({
                message: `Sorry...!!! 😌 user is not registered with this ${email} address.`
            });
        }

        const isPasswordMatched =
            isUserRegistered.password === crypto.createHash("md5").update(password).digest("hex");

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid password. Please check and try again...!!! 😯"
            });
        }

        const token = jwt.sign(
            { id: isUserRegistered._id },
            process.env.JWT_SECRET
        );

        // ✅ secure cookie added
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
        });

        res.status(200).json({
            message: "User Logged In Successfully... 🖐",
            user: {
                id: isUserRegistered._id,
                name: isUserRegistered.name,
                email: isUserRegistered.email,
            }
        });

    } catch (err) {
        res.status(500).json({
            message: "Login failed",
            error: err.message
        });
    }
});


// Get => /api/auth/getUser
authRouter.get('/getUser', async (req, res) => {
    try {
        const token = req.cookies.token;

        // ✅ check token exists
        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModuel.findById(decode.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User's fetched successfully...!!!",
            name: user.name,
            email: user.email,
        });

    } catch (err) {
        res.status(401).json({
            message: "Invalid or expired token",
            error: err.message
        });
    }
});

module.exports = authRouter;
