// Importing the Express framework to create the server and handle routing
const express = require('express');

// Creating an instance of the Express application
const app = express();

// Importing the cookie-parser middleware to parse cookies from incoming requests
const cookieParser = require("cookie-parser")

// Using the express.json() middleware to parse JSON payloads from incoming requests, allowing us to access the data in req.body
app.use(express.json());

// Using the cookie-parser middleware to parse cookies from incoming requests, which will allow us to access cookies in req.cookies
app.use(cookieParser());

// Importing the authentication routes from the auth.routes.js file, which will handle user registration and login functionality
const authRouter = require("./routes/auth.routes");

// Mounting the authentication routes on the "/api/auth" path, so that any requests to this path will be handled by the authRouter
app.use("/api/auth", authRouter);

// Exporting the Express application instance to be used in other parts of the application, such as in the server.js file where the server is started and listens for incoming requests.
module.exports = app;