import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  
    const [credentials, setCredentials] = useState({ name: "", email: '', password: "", cpassword: "" })
let Navigate = useNavigate();

    const onchange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }

    

    // const { email, password } = credentials;

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password
            
            })
        });

        const json = await response.json();
       
        if(json.success) {
            localStorage.setItem('auth-token', json.authtoken);
            Navigate( '/');
            props.showalert( "Account Created Successfully, welcome to home", "success")
        }else {
         props.showalert("Invalid credentials", "danger")

        
        }
        }
   


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onChange={onchange} type="text" className="form-control" name='name' id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onchange} type="email" className="form-control" name='email' id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onchange} type="password" className="form-control" name='password' id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input onChange={onchange} type="password" className="form-control" name='cpassword' id="cpassword" />
                    {credentials.password!== credentials.cpassword && <div className="text-danger">Passwords do not match</div>}
                </div>

                <button type="submit" disabled={credentials.password !== credentials.cpassword} className="btn btn-primary">Submit</button>
            </form>
        </div>


    )
}

export default Signup