// Importing Express Package by using "require" to create Backend Server
const express = require("express");

// Creating Instance of server
const app = express();

// Using Middleware to read request body. 
app.use(express.json());

// Creating Notes
const notes = [];

// Creating POST Api method to create new resources by client
app.post('/notes', (req, res) => {
    
})
// Creating GET Api method to send data in response to client

// Creating PATCH Api method to make partial modifications by client

// Creating DELETE Api method to delete resources by client

module.exports = app;