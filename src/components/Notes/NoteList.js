import React from "react";
import NoteItem from "./NoteItem";

const NoteList = ({ notes, filterCategory, handleDelete }) => {
  const filteredNotes = filterCategory ? notes.filter((note) => note.category === filterCategory) : notes;

  return (
    <div className="note-list">
      {filteredNotes.length > 0 ? (
        filteredNotes.map((note) => <NoteItem key={note._id} note={note} handleDelete={handleDelete} />)
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
};

export default NoteList;
