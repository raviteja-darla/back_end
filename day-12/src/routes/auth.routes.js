/*
This file is responsible for handling user authentication routes, such as registration and login.
It uses Express.js to create a router, and JWT for token generation. The user data is stored in a MongoDB database using Mongoose models.
*/

// Import necessary modules
const express = require("express");
// Create a new router instance
const authRouter = express.Router();
// Import JWT for token generation
const jwt = require("jsonwebtoken")
// Import the user model to interact with the database
const userModel = require("../models/user.model");

// Route for user registration
authRouter.post('/register', async (req, res) => {
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;
    
    // Check if a user with the provided email already exists in the database
    const isUserAlreadyExit = await userModel.findOne({ email })
    if(isUserAlreadyExit) {
        // If user already exists, return a 409 Conflict status with an appropriate message
        return res.status(409).json({
            meg: "user already exist with this id"
        })
    }
    
    // If user does not exist, create a new user in the database
    const user = await userModel.create({
        name, email, password
    })
    
    // Generate a JWT token for the newly registered user, including their id and email in the payload
    const token = jwt.sign({ 
        id : user._id,
        email: user.email,
    }, process.env.JWT_SECRET)

    // Send the token to the user in the response and save it in cookies
    res.cookie("token", token)

    // Return a success response with the user information and the generated token
    res.status(201).json({
        msg: "user created registered successfuly",
        user, token
    })
})

module.exports = authRouter;