import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //GET all notes
  const getNotes = async () =>{
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDliZDIxZTc1MDcyNDNlNjk1NWQ3In0sImlhdCI6MTcxNzkyODE3MX0.bBvMM-oq3hwHMoA3eqRz47tuZ-XLsyWqmTgithNVwRE"
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  //ADD note
  const addNote = async (title, description, tag) =>{
    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDliZDIxZTc1MDcyNDNlNjk1NWQ3In0sImlhdCI6MTcxNzkyODE3MX0.bBvMM-oq3hwHMoA3eqRz47tuZ-XLsyWqmTgithNVwRE"
      },
      body: JSON.stringify({title, description, tag})
    });
    // eslint-disable-next-line
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //DELETE note
  const deleteNote = async (id) =>{
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDliZDIxZTc1MDcyNDNlNjk1NWQ3In0sImlhdCI6MTcxNzkyODE3MX0.bBvMM-oq3hwHMoA3eqRz47tuZ-XLsyWqmTgithNVwRE"
      }
    });
    // eslint-disable-next-line
    const json = await response.json();
    //Logic
    const newNotes = notes.filter((note) => {return note._id !== id})
    setNotes(newNotes)
  }

  //EDIT note
  const editNote = async (id, title, description, tag) =>{
    //API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDliZDIxZTc1MDcyNDNlNjk1NWQ3In0sImlhdCI6MTcxNzkyODE3MX0.bBvMM-oq3hwHMoA3eqRz47tuZ-XLsyWqmTgithNVwRE"
      },
      body: JSON.stringify({title, description, tag})
    });
    // eslint-disable-next-line
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
        {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
