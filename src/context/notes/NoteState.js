import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://backend-8x0t.onrender.com";
  const [Note, setNote] = useState([]);

  // Get all notes
  const getnotes = async () => {
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),  
      },
    });
    const data = await response.json();
    setNote(data);
  };

  
// Add a note
const addNote = async (title, description, tag) => {
  const response = await fetch(`${host}/api/note/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token") ,
    },

    body: JSON.stringify({ title, description, tag }),
  });
  const newNote = await response.json();
  setNote([...Note, newNote]);
};


// Delete a note
const Deletenote = async (id) => {
  const response = await fetch(`${host}/api/note/deletenote/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"), 
      },
    });
  const json = await response.json();
  if (!response.ok) throw json;
  setNote(Note.filter((note) => note._id !== id));
};


  // Edit a note
  
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"), 
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const updatedNote = await response.json();
    setNote(Note.map((note) => (note._id === id ? updatedNote : note)));
  };


  return (
    <NoteContext.Provider
      value={{ Note, setNote, addNote, getnotes, editnote, Deletenote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
