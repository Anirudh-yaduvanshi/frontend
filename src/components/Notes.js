import React, { useContext, useEffect, useRef, useState } from 'react'
import Noteitem from './Noteitem';
import AddNote from "./AddNote";
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const Navigate = useNavigate();
  const ref = useRef(null)
  const { Note, getnotes, editnote } = useContext(NoteContext);

  useEffect(() => {
    if (!localStorage.getItem('authtoken')) {
      getnotes();
    }
    else {
      // console.log("me hu jo gand mrara notes.js me linen 14")
      Navigate('/login');
    }
  }, [getnotes, Navigate])

const showalert = props.showalert;
    const [selectedNote, setSelectedNote] = useState(null);
  const [nNote, setnNote] = useState({ title: "", description: "", tag: "" });

  const updatenote = (note) => {
    ref.current.click();
    setSelectedNote(note._id);
    setnNote({ title: note.title, description: note.description, tag: note.tag });
  }

  const onChange = (e) => {
    setnNote({ ...nNote, [e.target.name]: e.target.value });
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    editnote(selectedNote, nNote.title, nNote.description, nNote.tag);
    showalert('Note updated successfully',"warning");
  }

  return (
    <>
{/* popup start here */}

      <button type="button" className="btn  d-none btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content carditemhye">
            <div className="modal-header">
              <h5 className="modal-title  " id="exampleModalLabel">Update Note</h5>
              <button type="button" className="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
              {/* onSubmit={handlesubmit}  */}

                <div className="mb-3">
                  <label htmlFor="ntitle" className="  form-label">Title</label>

                  <input type="text" className="form-control" id="ntitle" name='title' value={nNote.title} required onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="desc" className="  form-label">Description</label>
                  <textarea className="form-control" id="desc" name='description' value={nNote.description} required onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="  form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name='tag' value={nNote.tag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" disabled={nNote.title.length < 5 || nNote.description.length < 5} className="btn btn-primary" onClick={handlesubmit}  data-bs-dismiss="modal" >Save changes</button>
            </div>
          </div>
        </div>
      </div>

{/* popup ends here */}

{/* start of code */}
          <AddNote showalert={props.showalert}/>

      
      <div className='row rounded p-5 bg-dark mb-0 my-3'>
        <h2> Your Notes</h2>
        {
          Note.length > 0 ? Note.map(note => (
            <Noteitem key={note._id} updatenote={updatenote} showalert={props.showalert} note={note} />
          )) : <h3 className='text-secondary my-4 required' >No Note to display. please add.!</h3>
        }
      </div>
    </>
  )
}

export default Notes