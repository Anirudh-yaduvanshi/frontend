import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

const Noteitem = (props  ) => {
  const { note, updatenote  } = props;
    const {Deletenote } = useContext(NoteContext);
  
  const handleEdit = (note) => {
    updatenote(note);
  }

 const handledelete = async(id) =>{
  await Deletenote(id);
  props.showalert("Note deleted successfully","danger")

 }



  const [descr, setdescr] = useState('d-none')
  const toggleDescription = () => {
    setdescr(descr === 'd-none' ? '' : 'd-none');
  }
  return (
    <div className='col-md-2'>
      <div className='card rounded carditemhye border-danger  my-3'>
        <div className='card-body '>
          <h4 className='card-title'>{note.title}</h4>
          <h6 className=' my-3 mx-2 card-text'>{note.tag}</h6>
          <p className= {`${descr} "card-text"`} >{note.description}</p>
          <button type='button' className='btn mx-1  my-1 btn-primary' onClick={()=>handleEdit(note)}><i className='bx bx-edit'></i></button>
          <button type='button' className='btn mx-1 my-1 btn-danger' onClick={()=>handledelete(note._id)}><i className='bx bx-x'></i></button>
          <button type='button' className='btn mx-1 my-1 btn-warning' onClick={toggleDescription}><i className='bx bx-show'></i></button>
        </div>
      </div>
    </div>
  )
}

export default Noteitem