import React, {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDliZDIxZTc1MDcyNDNlNjk1NWQ3In0sImlhdCI6MTcxNzkyODE3MX0.bBvMM-oq3hwHMoA3eqRz47tuZ-XLsyWqmTgithNVwRE"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
          });
          const json = await response.json();
          if(json.success){
            //save authtoken and redirect
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Login successful", "success");
            navigate("/");
          }
          else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
    // <div className='container'>
    //     <form onSubmit={handleSubmit} >
    //         <div className="mb-3">
    //             <label htmlhtmlhtmlFor="email" className="form-label">Email address</label>
    //             <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
    //             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //         </div>
    //         <div className="mb-3">
    //             <label htmlhtmlhtmlFor="password" className="form-label">Password</label>
    //             <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
    //         </div>
    //         <button type="submit" className="btn btn-primary" >Submit</button>
    //     </form>
    // </div>

    // NEW----------------------------------------
    <div className="login-card-container">
        <div className="login-card">
            <div className="card-left">
                <h2 className="login-card-title">Login</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" name="password" value={credentials.password} onChange={onChange} required minLength={5}  />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <Link className="signup-link" to="/signup">Don't have an account? Sign up</Link>
            </div>
            <div className="card-right"></div>
        </div>
    </div>
  )
}

export default Login