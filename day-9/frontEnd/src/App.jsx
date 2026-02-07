import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [notes, setNotes] = useState([])

    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/notes');
            setNotes(res.data.notes);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='container'>
            <button onClick={fetchData} className='btn'>Fetch Data</button>
            <div className="notes">
                {
                    notes.map(note => {
                        return <div className="note" key = {note._id}>
                            <div>{ note.title }</div>
                            <div>{ note.description }</div>
                        </div>
                    })
                }
            </div>
        </div>
        
    )
}

export default App
