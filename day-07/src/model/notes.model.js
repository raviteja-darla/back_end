// Importing mongoose to create notes 
const { default: mongoose, mongo } = require("mongoose");

// Creating Notes Schema to understand Database structor of Notes
const notesSchema = new mongoose.Schema({
    title: String,
    description: String,
});             

// Creating Notes model to perform CRUD operations on Notes collection in Database
const notesModel = mongoose.model("notes", notesSchema);

module.exports = notesModel;