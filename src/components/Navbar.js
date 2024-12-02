import {React, useEffect} from 'react'
import { Link , useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const Navigate= useNavigate();
    let location = useLocation();
    useEffect(() => {

    }, [location]);
    
      
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Inotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link ${location.pathname==="/home"||location.pathname==="/" ? "active": ""}`} to="/home">Home</Link>
                        <Link className={`nav-link ${location.pathname==="/about" ? "active": ""}`} to="/about">About</Link>
                        

                    </div>
                </div>

                {!localStorage.getItem("auth-token")? <div className='d-flex'>
                    <Link to="/login" role='button' className='btn btn-primary rounded px-2 mx-2  text-tertiory' > Login</Link>
                    <Link to="/signup" role='button' className='btn btn-primary rounded px-2 mx-2 text-tertiory' > Signup</Link>
                </div>:   <div className='d-flex'>   <Link onClick={()=>{ localStorage.removeItem("auth-token");
                                Navigate( '/login');

                 }} to="/login" role='button' className='btn btn-danger rounded px-2 mx-2 text-tertiory' > log out <i className='bx bx-log-out'></i>   </Link> </div>}
            </div>
        </nav>
    )
}

export default Navbar