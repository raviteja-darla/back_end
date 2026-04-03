// Importing express package by "require("express")"
const express = require("express");

// Creating instance of Server by calling "express()"
const app = express();

// Creating a sample route using GET Method at root path "/"
app.get('/', (req, res) => {
    // when user visits '/' server will send response back
    res.send("Hello World!")
});

// Server starts here & then Server will listening at 3000 port once we execute CMD: npx nodemon server.js
app.listen(3000);