// Importing Express to create server and perform CRUD operations on it;
const express = require("express");
const cors = require("cors")

// Creating Express app to create server and perform CRUD operation on it;
const app = express();

app.use(cors())

// Middelware to read request body;
app.use(express.json());

// Importing Notes model to perform CRUD operations on notes collections in database;
const notesModel = require("./model/model.notes");

// Creating POST /api/notes/ to create new resources
app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;
    const notes = await notesModel.create({
        title, description
    });
    res.status(201).json({
        message: "New resources was created successfully."
    })
});

// Creating GET /api/notes/ to send data in response to client;
app.get('/api/notes', async (req, res) => {
    const notes = await notesModel.find();
    res.status(200).json({
        message: "Data Fetched Successfully",
        notes
    })
})

// Creating DELETE /api/notes/ to delete notes on client request;
app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    await notesModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "Request successfully served." 
    })
})

// Creating PATCH /api/notes/ to update resources by client requres
app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const { description, title } = req.body
    await notesModel.findByIdAndUpdate(id, { description, title });
    res.status(200).json({
        message: "Request served successfully",
        description, title
    })
})

// Exporting app to use it in server.js file;
module.exports = app;