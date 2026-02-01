const express = require("express");

const app = express();

app.use(express.json())

const notes = [];

// Post 
app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message: "Note Created Successfully...!"
    })
});



























module.exports = app;