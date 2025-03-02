// import React, { useEffect, useState, useContext } from "react";
// import { fetchNotes, deleteNote } from "../../utils/api";
// import { AuthContext } from "../../context/AuthContext";
// import NoteForm from "./NoteForm";
// import NoteList from "./NoteList";
// import Filter from "./Filter";

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [notes, setNotes] = useState([]);
//   const [filterCategory, setFilterCategory] = useState("");

//   useEffect(() => {
//     const getNotes = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await fetchNotes(token);
//         setNotes(data);
//       } catch (error) {
//         console.error("Error fetching notes", error);
//       }
//     };

//     getNotes();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await deleteNote(id, token);
//       setNotes(notes.filter((note) => note._id !== id));
//     } catch (error) {
//       console.error("Error deleting note", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Welcome, {user?.name}!</h2>
//       <NoteForm setNotes={setNotes} />
//       <Filter setFilterCategory={setFilterCategory} />
//       <NoteList notes={notes} filterCategory={filterCategory} handleDelete={handleDelete} />
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState, useContext } from "react";
import { fetchNotes, deleteNote } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import NoteForm from "./NoteForm";
import NoteList from "./NoteList";
import Filter from "./Filter";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); 

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await fetchNotes(token);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes", error);
      }
    };

    getNotes();

    socket.on("refreshNotes", () => {
      getNotes();
    });

    return () => {
      socket.off("refreshNotes");
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteNote(id, token);
      setNotes(notes.filter((note) => note._id !== id));
      socket.emit("noteUpdated");
    } catch (error) {
      console.error("Error deleting note", error);
    }
  };

  return (
    <div className={darkMode ? "dark-mode" : "container"}>
      <h2>Welcome, {user?.name}!</h2>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <NoteForm setNotes={setNotes} />
      <Filter setFilterCategory={setFilterCategory} />
      <NoteList notes={notes} filterCategory={filterCategory} handleDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;

