import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const ForgetPassword = () => {



    const host="http://localhost:5000"

    const [credentials, setcredentials] = useState({email:""})
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/forgotpassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email:credentials.email}),
        });
         
    
        const json = await response.json();
        console.log(json)
        if(json.success){
           localStorage.setItem('token',json.token);
           navigate('/verify');
           alert("OTP sent successfully")

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
     <h2 className='my-3'>Forget Password</h2>
    <form onSubmit={handleSubmit} className='my-3'>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
     placeholder="Enter email" name='email' onChange={onchange} value={credentials.email} required />
  </div><br />
  <button type="submit" className="btn btn-primary">Send Otp</button>
</form>
    
    </>
  )
}

export default ForgetPassword