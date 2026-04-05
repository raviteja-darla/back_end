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
app.patch('/notes/:idx', (req, res) => {
    notes[req.params.idx].description = req.body.description;
    res.send(`Note ${idx} Successfully Modified`)
})

module.exports = app;