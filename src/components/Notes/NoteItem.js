import React, { useState } from "react";
import NoteForm from "./NoteForm";

const NoteItem = ({ note, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="note-item">
      {isEditing ? (
        <NoteForm existingNote={note} setIsEditing={setIsEditing} />
      ) : (
        <>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <small>Category: {note.category}</small>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NoteItem;
