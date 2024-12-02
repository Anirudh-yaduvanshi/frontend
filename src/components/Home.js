import React from 'react'

import Notes from './Notes'
import { useNavigate } from "react-router-dom";



const Home = (props) => {
  
  const Navigate = useNavigate();

  if(localStorage.getItem('auth-token') === null){
    props.showalert('Please login first',"warning");
    Navigate('/login')
  }
  return (
    
    <>
  <h1 className='my-4'>Inotebook - Home</h1>

<Notes showalert={props.showalert} />

      </>
  )
}

export default Home