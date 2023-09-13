import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Verify = () => {



    const host="http://localhost:5000"

    const [credentials, setcredentials] = useState({email:"",otp:"",newPassword:""})
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email:credentials.email,otp:credentials.otp,newPassword:credentials.newPassword}),
        });
         
    
        const json = await response.json();
        console.log(json)
        if(json.success){
           localStorage.setItem('token',json.token);
           navigate('/login');
           alert("New  Password  successfully Created")

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
     <h2 className='my-3'>Verify Password</h2>
    <form onSubmit={handleSubmit} className='my-3'>
    <div className="form-group">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
     placeholder="Enter email" name='email' onChange={onchange} value={credentials.email} required />
  </div>
  <div className="form-group">
    <label htmlFor="otp">Otp</label>
    <input type="number" className="form-control" id="otp" aria-describedby="emailHelp"
     placeholder="Enter otp" name='otp' onChange={onchange} value={credentials.otp} required />
  </div>
  <div className="form-group">
    <label htmlFor="newPassword">New Password</label>
    <input type="password" className="form-control" id="newPassword" aria-describedby="emailHelp"
     placeholder="Enter New Password" name='newPassword' onChange={onchange} value={credentials.newPassword} required />
  </div><br />
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    
    </>
  )
}

export default Verify