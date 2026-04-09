import { useState } from "react"
import axios from "axios"
import './App.css'

function App() {

    const [notes, setNotes] = useState([])

    axios.get("http://localhost:3000/api/notes/")
    .then((res) => {
        setNotes(res.data.notes)
    });

    const deleteHandler = () => {
        
    }

    return (
        <div>
            <h1>Notes</h1>
            <div className="notes-container">
                {
                    notes.map(note => {
                        return (
                            <div key={note._id} className="note">
                                <div className="note-details">
                                    <div className="title">{note.title}</div>
                                    <div className="descrip">{note.description}</div>
                                </div>
                                <div className="btn-container">
                                    <button>Edit</button>
                                    <button onClick={() => {deleteHandler}}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>
    )    
}

export default App
