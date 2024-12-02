import React, { useState, useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const Addnote = (props) => {
  const { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" }); 
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value  });
  }


  const handleClick = (e) => {
    e.preventDefault(); // Prevent form submission
    if (note.title && note.description && note.tag) { 
      const id = Date.now().toString(); // Get the note id from the database
      const newNote = { id, ...note , date: new Date() };
      addNote(newNote.title , newNote.description, newNote.tag); // Add the note to the database
      props.showalert("Note has been added successfully", "success");

    }
    setNote({ title: "", description: "", tag: "" }); // Reset the form



  }


 
 

  

 

  return (
    <div className='container bg-dark border-danger py-2 px-4 w-75 border rounded  my-5'>
      <h2>
        Add a new note:
      </h2>
     {/* add note main wala form */}
      <form className='my-3' onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="title"  className="form-label">Title</label>
          <input type="text"  required className="form-control" id="title" name='title' placeholder='Title' value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <textarea type="text" value={note.description}  required className="form-control" id="desc" name='description' placeholder='Description' onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" required value={note.tag} placeholder='Tag' className="form-control" id="tag" name='tag' onChange={onChange} />
        </div>

        <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary">Add Note</button>
      </form>
    </div>
  )
}

export default Addnote