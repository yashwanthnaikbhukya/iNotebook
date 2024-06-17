import React, {useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'

const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""})
    let navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save authtoken and redirect
            localStorage.setItem("token", json.authtoken);
            props.showAlert("Account created Successfully", "success");
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
    //             <label htmlFor="name" className="form-label">Name</label>
    //             <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
    //         </div>
    //         <div className="mb-3">
    //             <label htmlFor="email" className="form-label">Email address</label>
    //             <input type="email" className="form-control" id="exampleInputEmail1" name='email' aria-describedby="emailHelp" onChange={onChange} />
    //             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    //         </div>
    //         <div className="mb-3">
    //             <label htmlFor="password" className="form-label">Password</label>
    //             <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5}/>
    //         </div>
    //         <div className="mb-3">
    //             <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    //             <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} required minLength={5}/>
    //         </div>
    //         <button type="submit" className="btn btn-primary">Submit</button>
    //     </form>
    // </div>

    //NEW/-----------------
    <div class="login-card-container">
        <div class="login-card">
            <div class="card-left">
                <h2 class="login-card-title">Sign Up</h2>
                <form onSubmit={handleSubmit} >
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange}  placeholder="Enter your name" required />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}  placeholder="Enter your email" required />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" name='password' onChange={onChange} required minLength={5} placeholder="Enter your password" />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Sign Up</button>
                </form>
                <Link className="signup-link" to="/login">Already have an account? Log in</Link>
            </div>
            <div class="card-right"></div>
        </div>
    </div>
  )
}

export default Signup