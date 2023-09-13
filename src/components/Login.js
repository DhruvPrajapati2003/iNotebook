import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
const Login = () => {


  
 
  


    const host="http://localhost:5000"

    const [credentials, setcredentials] = useState({email:"",password:""})
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email:credentials.email,password:credentials.password}),
        });
         
    
        const json = await response.json();
        console.log(json)
        if(json.success){
           localStorage.setItem('token',json.token);
           localStorage.setItem('name',json.name);
           navigate('/');
           alert("Login Succesfully")

        }
        else{
          alert("invalid credentials")
        }
      }



      const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
  }



  return (
    <>
     <h2 className='my-3'>Login</h2>
    <form onSubmit={handleSubmit} className='my-3'>
  <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
     placeholder="Enter email" name='email' onChange={onchange} value={credentials.email} required/>
  </div>
  <div className="form-group my-2">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password"  name='password' placeholder="Password" onChange={onchange} value={credentials.password} required/>
  </div>
{/* 
  <span><Link  aria-current="page" to="/changeemail">Reset Email</Link></span>

  <span className='mx-3'><Link aria-current="page" to="/changepassword">Reset Password</Link></span> */}
  <span className='mx-2'><Link aria-current="page" to="/forgetpassword">Forget Password</Link></span><br /><br />
 
  <button type="submit" className="btn btn-primary">Login</button>
</form>
    
    </>
  )
}

export default Login





