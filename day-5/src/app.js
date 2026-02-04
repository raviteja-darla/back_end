const express = require("express");

const app = express();

app.use(express.json())

const notes = [];

// Post 
app.post('/notes', (req, res) => {
    const newNote = req.body;
    notes.push(newNote)

    res.status(201).json({
        message: "Note Created Successfully...!",
        data: newNote
    })
});

// Get Method
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: "Note Fetched Successfully",
        data: notes
    });
})

// Delete Method
app.delete('/notes/:index', (req, res) => {
    delete notes [ req.params.index ]

    res.status(204).json({
        message: "Note Deteled Successfully...!"
    })
})

// Patch Notes
app.patch('/notes/:index', (req, res) => {
    notes [ req.params.index ].description = req.body.description;

    res.status(200).json({
        message: "Note Updated Successfull...!"
    })
})


// darlaraviteja04_db_user
// hXu4aqhoXkPno4mS






















module.exports = app;