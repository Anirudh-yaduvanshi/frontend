import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: "" })
    const Navigate= useNavigate();


    const onchange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    // const { email, password } = credentials;
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });

        const json = await response.json();
        
        if (json.success) {
            localStorage.setItem('auth-token', json.authtoken);
            props.showalert( "Account login Successfully", "success")
            Navigate( '/');
        } else {
            props.showalert("Invalid deteils", "danger")

        }
    };

    return (
        <>
        
        <h1 className='my-4'>Welcome to your Notes App</h1>
        <p>Please provide your <strong>:</strong></p>
        <form className='my-1 container w-50' onSubmit={handleSubmit}>
            <div className="mb-3 ">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input onChange={onchange} type="email" className="form-control" value={credentials.email} id="exampleInputEmail1" name='email' />
            </div>
            <div className="mb-4">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input onChange={onchange} type="password" className="form-control" value={credentials.password} id="exampleInputPassword1" name='password' />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </>
        )

}

export default Login