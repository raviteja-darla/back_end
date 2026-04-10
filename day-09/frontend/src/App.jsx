import {useEffect, useState } from "react"
import axios from "axios"
import './App.css'

function App() {

    const [notes, setNotes] = useState([])
    const [editId, setEditId] = useState(null);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const BASE_URL = "http://localhost:3000/api/notes";

    // GET API Intergration Method;
    const fetchData = async () => {
        try{
            const response = await axios.get(BASE_URL);
            setNotes(response.data.notes)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // POST API and PATCH Intergration Method;
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!title && !description) return alert("Please Enter all required fileds")

        try {
            if(editId) {
                await axios.patch(`${BASE_URL}/${editId}`, {
                    title, description
                })
                console.log("Successfully Updated")
            } else {
                await axios.post(BASE_URL, {
                    title, description
                })
            }
            // Refresh UI
            fetchData();

            // Reset Form
            setTitle("");
            setDescription("");
            setEditId(null);
        } catch (error) {
            console.log(error)
        }
    }

    // UpdateNote;
    const updateNote = (id) => {
        const note = notes.find(note => note._id === id)
        console.log(note)
        if(!note) return

        setEditId(id)
        setTitle(note.title)
        setDescription(note.description)
    }

    // Delete Handler
    const deleteHandler = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/notes/${id}`)
            .then(() => {
                console.log("Request Served Successful")
                fetchData()
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            
            {/* Inputs */}
            <div className="inputs-container">
                <form className="note-create-form" onSubmit={submitHandler}>
                    
                    <div className="title-input">
                        <label htmlFor="title">Notes Title:</label>
                        <input 
                            type="text"
                            value={title}
                            placeholder="Enter Title of your Notes" 
                            onChange={(e) => setTitle(e.target.value)} /> 
                    </div>
                    
                    <div className="desc-input">
                        <label htmlFor="description">Notes Description:</label>
                        <textarea 
                            rows="6"
                            value={description}
                            placeholder="Enter your Notes....!"
                            onChange={(e) => setDescription(e.target.value)}>    
                        </textarea>
                    </div>
                    
                    <button type="submit">
                        { editId ? "Update Note" : "Create Note"}
                    </button>
                
                </form>
            </div>

            {/* Notes Container */}
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
                                    <button onClick={() => updateNote(note._id)}>Edit</button>
                                    <button onClick={() => deleteHandler(note._id)}>Delete</button>
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
