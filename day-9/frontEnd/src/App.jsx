import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
    const [notes, setNotes] = useState([])

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/notes')
            setNotes(res.data.notes)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()

        const { title, description } = e.target.elements

        axios.post('http://localhost:3000/api/notes', {
            title: title.value,
            description: description.value,
        })
        .then(() => {
            fetchData()   // ✅ fetch AFTER post succeeds
            e.target.reset() // ✅ clear form
        })
        .catch((err) => {
            console.error(err)
        })
    }

    function handleDelete (noteId) {
        console.log(noteId)
        axios.delete("http://localhost:3000/api/notes/" + noteId)
        .then((res) => {
            console.log(res.data)
            fetchData()   // ✅ fetch AFTER delete succeeds
        })
    }

    function handleUpdate () {

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="description" placeholder="Description" />
                <button type="submit">Form Submit</button>
            </form>

            <div className="notes">
                {notes.map((note) => (
                    <div className="note" key={note._id}>
                        <div>{note.title}</div>
                        <div>{note.description}</div>
                        <button onClick={() => {handleDelete(note._id)}}>Delete</button>
                        <button onClick={() => {handleUpdate(note._id)}}>Update</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App

/*
npm run build to create build folder with 3 files HTML, CSS, JavaScript

copy those files from frontend the create public folder in backend folder and paste over there

need to use another middleware
wild card route in app.js in backend 

const path = require("path")

app.use(express.static("./public"))

app.use('*name' (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html" )) // This response will give to the user when ever user enter url which is not exist.
})



*/ 