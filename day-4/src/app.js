// Importing Express package into Node.js Project
const express = require("express");

// Creating a Server Instance
const app = express();

// MiddleWare
app.use(express.json())

// Creating a Notes that user can Create, Read, Update, Delete
const notes = []

// Creating a POST method
app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.send("New Notes Successfully Created.")
})

// Creating a GET method
app.get('/notes', (req, res) => {
    res.send(notes)
})

// Creating a Patch Method
app.patch('/notes/:index', (req, res) => {
    notes[req.params.index].description = req.body.description;
    res.send("Note Successfully Modified");
})

// Creating a DELETE method
app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index]
    res.send("Note Deleted Successfully.")
})

module.exports = app;