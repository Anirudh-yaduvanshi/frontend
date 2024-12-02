import React, { useState } from 'react';
import './App.css';

import {BrowserRouter as Router , Route,  Routes } from "react-router-dom";


import NoteState from './context/notes/NoteState';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null)
  const showalert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }

  return (

    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
         
                        
            <Routes>
             
              
            <Route exact path="/" element={ <Home showalert={showalert} />}/>
              <Route exact path="/home" element={<Home showalert={showalert} />} />
              <Route exact path="/about" element={<About showalert={showalert} />} />
              <Route exact path="/login" element={<Login showalert={showalert} />} />
              <Route exact path="/signup" element={<Signup showalert={showalert} />} />

            </Routes>
          
        </Router>
      </NoteState>
    </>
  )
}

export default App;
