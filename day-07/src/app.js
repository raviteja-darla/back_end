// Importing Express to create server and perform CRUD operations on it;
const express = require("express");

// Creating Express app to create server and perform CRUD operations on it;
const app = express();

// Using express.json() middleware to parse JSON data from request body;
app.use(express.json());

// Importing Notes model to perform CRUD operations on Notes collection in Database
const notesModel = require('./model/notes.model');

// Creating POST API Method to send data in response to client
app.post('/notes', async (req, res) => {
    const { title, description } = req.body;
    const note = await notesModel.create({
        title, description
    });
    res.status(201).json({
        message: "New resources created successfully"
    });
});

// Creating GET API Method to fetch data in response to client
app.get('/notes', async (req, res) => {
    const notes = await notesModel.find();
    res.status(200).json({
        message: "Data fetched successfully",
        notes
    })
});

// Exporting app to use it in server.js file;
module.exports = app;