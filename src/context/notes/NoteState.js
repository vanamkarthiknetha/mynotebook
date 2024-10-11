import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const [notes, setNotes] = useState([]);

  // get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add note
  const addNote = async (title, description, tag) => {
    //API call
    
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        "auth-token":
        localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //client side
    const note=await response.json()

    setNotes(notes.concat(note));
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // client side
    const newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes)
  };
  // Delete note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type":"application/json",

        "auth-token":
          localStorage.getItem('token'),
      },
    });
    // client side
    const newNotes = notes.filter((note) => {
      return id !== note._id;
    });
    setNotes(newNotes);

  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
