const express = require("express");

const app = express();

app.use(express.json())

const notes = []

// Post Method to Create a New Post
app.post('/notes', (req, res) => {
    notes.push(req.body);
    res.send("Note Successfully Created...!!!")
})

// Get Method to Get data from server
app.get('/notes', (req, res) => {
    res.send(notes)
})

// Patch Method to update existing Note
app.patch('/notes/:index', (req, res) => { 
    notes [ req.params.index ].description = req.body.description;
    res.send("Note Updated Successfully...!") 
}) 

// Delete Method to Delete a Note
app.delete('/notes/:index', (req, res) => {
    delete notes [ req.params.index ]
    res.send("Note Deleted Successfully...!")
})












/* 
{ 
    "title": "test title no.1",
    "description": "test description no.1"
}
*/
module.exports = app;
