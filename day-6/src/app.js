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
    notes.push(req.body);
    res.status(201).json({ message: "New resources created successfully" })
})

// Creating GET Api method to send data in response to client
app.get('/notes', (res) => {
    res.status(200).json({
        message: "Fetched data successfully",
        notes: notes
    })
})

// Creating PATCH Api method to make partial modifications by client
app.patch('/notes/:idx', (req, res) => {
    notes [req.params.idx].description = req.body.description;
    res.status(200).json({ message: "Resources successfully updated" })
})

// Creating DELETE Api method to delete resources by client
app.delete('/notes/:idx', (req, res) => {
    delete notes [req.params.idx];
    res.status(204).json({ message: "Requested resources deleted successfully" })
})
module.exports = app;