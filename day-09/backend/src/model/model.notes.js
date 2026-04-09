// Importing mongoose to create notes;
const mongoose = require("mongoose");

// Creating Notes Schema to understand database structor of notes
const notesSchema = new mongoose.Schema({
    title: String, 
    description: String,
});

// Creating Notes Model to perform CRUD Operations on Notes collection in Database;
const notesModel = mongoose.model("notes", notesSchema);

// Exporting NotesModel to access in app.js
module.exports = notesModel