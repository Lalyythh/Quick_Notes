import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:4000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", id: null });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      await axios.put(`${API_URL}/${form.id}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ title: "", content: "", id: null });
    fetchNotes();
  };

  const handleEdit = (note) => {
    setForm({ ...note, id: note._id });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchNotes();
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>📝 QuickNotes</h1>

      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Note title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Note content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        ></textarea>
        <button type="submit">{form.id ? "Update" : "Add"} Note</button>
      </form>

      <div className="notes">
        {filteredNotes.map((note) => (
          <div key={note._id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="actions">
              <button onClick={() => handleEdit(note)}>✏️ Edit</button>
              <button onClick={() => handleDelete(note._id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
