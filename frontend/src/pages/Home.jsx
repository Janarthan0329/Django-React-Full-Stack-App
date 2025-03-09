import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        api.get('/api/notes/')
        .then((res) => res.data)
        .then((data) => {setNotes(data); console.log(data) })
        .catch((error) => alert(error));
    };

    const deleteNote = async (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if (res.status === 204) alert('Note deleted');
            else alert('Error deleting note');
            getNotes();
        }).catch((error) => alert(error));
    };

    const createNote = async (e) => {
        e.preventDefault();
        api.post('/api/notes/', {title, content}).then((res) => {
            if (res.status === 201) alert('Note created');
            else alert('Error creating note');
            getNotes();
        }).catch((error) => alert(error));
    };

    return (
        <div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} key={note.id} onDelete={deleteNote} />
                ))}
            </div>
            <h2>Create Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title</label>
                <br />
                <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} required value={title} />
                <br />
                <label htmlFor="content">Content</label>
                <br />
                <textarea id="content" name="content" onChange={(e) => setContent(e.target.value)} required value={content} />
                <br />
                <input type="submit" value="Create Note" />
            </form>
        </div>
    );
}

export default Home;