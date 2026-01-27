const express = require("express");

const app = express();

app.use(express.json())

const notes = [];

app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.send("Note Successfully Created...!!!")
})
app.get('/notes', (req,res) => {
    res.send(notes)
    res.send("Note Successfully Fetched...!!!")
}) 
app.patch('/notes/:index', (req, res) => {
    notes [ req.params.index ].description = req.body.description
    res.send("Note Successfully Updated...!!!")
})
app.delete('/notes/:index', (req, res) => {
    delete notes[ req.params.index ]
    res.send("Note Successfully Deleted...!!!")
})






module.exports = app;
