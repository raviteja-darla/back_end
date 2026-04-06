// Importing Express server
const express = require("express");

// Creating a instance of Server
const app = express()

// MiddleWare to read user request body
app.use(express.json())

// Creating Notes
const notes = []

// Creating POST api method to create new resources by client
app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message: "New Resources Created Successfully"
    })
})

// Creating GET API Method to fetch data by client
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "Data Fetched Successfully",
        notes: notes
    })
})

// Creating PATCH API Method to Update any resources partically by client.
app.patch('/notes/:idx', (req, res) => {
    notes [req.params.idx].description = req.body.description;
    res.status(200).json({
        message: "Resources Updated Successfully"
    })
})

// Creating DELETE API Method to delete any resources by client. 
app.delete('/notes/:idx', (req, res) => {
    delete notes [req.params.idx];
    res.status(204).json({
        message: "Resources Deleted Successfully"`
    })
})
module.exports = app;
