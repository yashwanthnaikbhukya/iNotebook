import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description:"", tag:""})
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description:"", tag:""})
        props.showAlert("Note added successfully", "success")
    }
    const onChange = (e) =>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
        {/* <div className='container my-3'>
        <h2>Add a note</h2>
        <form className='my-3' >
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Decription</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={3} required />
        </div>
        <button disabled={note.title.length < 5 || note.description.length < 5 } type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
        </form>
    </div> */}
    <div className='container d-flex justify-content-center my-5'>
            <div className='card' style={{ width: '50rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div className='card-body'>
                    <h2 className='card-title text-center'>Add a Note</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={3} required />
                        </div>
                        <button type="submit" className="btn btn-primary d-block mx-auto addnote" onClick={handleClick} style={{backgroundColor:"#333"}} disabled={note.title.length < 5 || note.description.length < 5} >Add Note</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default AddNote