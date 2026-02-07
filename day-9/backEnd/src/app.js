const express = require("express");

const app = express();

app.use(express.json());

const noteModel = require("./models/node.model")

// Post api Method
app.post('/api/notes', async (req, res) =>{
    const { title, description } = req.body;

    const note = await noteModel.create({
        title, description 
    })

    res.status(201).json({
        message: "New note created successfully...!",
        note
    })
})


// Get api Method
app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Successfully fetched data...!",
        notes
    })
})


app.delete('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await noteModel.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting note",
            error: error.message
        });
    }
});

app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id;
    const {  title } = req.body;

    console.log(req.body);
    const updateNote = await noteModel.findByIdAndUpdate(id, { title });
    
    res.status(200).json({
        message: "Note updated successfully...!",
        updateNote
    })

})

module.exports = app;