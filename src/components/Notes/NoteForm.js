import React, { useState, useEffect } from "react";
import { createNote, updateNote } from "../../utils/api";

const NoteForm = ({ setNotes, existingNote, setExistingNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setCategory(existingNote.category);
    } else {
      setTitle("");
      setContent("");
      setCategory("");
    }
  }, [existingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = { title, content, category };

    try {
      if (existingNote) {
        const { data } = await updateNote(existingNote._id, noteData, token);
        setNotes((prevNotes) =>
          prevNotes.map((note) => (note._id === existingNote._id ? data : note))
        );
        setExistingNote(null); 
      } else {
        const { data } = await createNote(noteData, token);
        setNotes((prevNotes) => [...prevNotes, data]);
      }

      // Clear input fields
      setTitle("");
      setContent("");
      setCategory("");
    } catch (error) {
      console.error("Error saving note", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">{existingNote ? "Update Note" : "Add Note"}</button>
    </form>
  );
};

export default NoteForm;
