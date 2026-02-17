const express = require("express");

const authRouter = express.Router();

const authController = require("../controllers/auth.controller")

// POST - Resgister for NewUser url: http://localhost:3000/api/auth/register
authRouter.post('/register', authController.registerController)

// POST - login for Registered Users url: http://localhost:3000/api/auth/login
authRouter.post('/login', authController.loginController)

module.exports = authRouter;