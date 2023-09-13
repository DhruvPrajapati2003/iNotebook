import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Changepassword = () => {



    const host="http://localhost:5000"

    const [credentials, setcredentials] = useState({email:"",currentPassword:"",newPassword:""})
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/changepassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email:credentials.email,currentPassword:credentials.currentPassword,newPassword:credentials.newPassword}),
        });
         
    
        const json = await response.json();
        console.log(json)
        if(json.success){
           localStorage.setItem('token',json.token);
           navigate('/login');
           alert("Your Password Has Been Changed")

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
     <h2 className='my-3'>Reset Password</h2>
    <form onSubmit={handleSubmit} className='my-3'>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
     placeholder="Enter email" name='email' onChange={onchange} value={credentials.email} required />
  </div>
  <div className="form-group my-2">
    <label htmlFor="currentPassword">Current Password</label>
    <input type="password" className="form-control" id="currentPassword"  name='currentPassword' placeholder="Current Password" onChange={onchange} value={credentials.currentPassword} required />
  </div>
  <div className="form-group">
    <label htmlFor="newPassword">New Password</label>
    <input type="password" className="form-control" id="newPassword" aria-describedby="emailHelp"
     placeholder="New Passwor" name='newPassword' onChange={onchange} value={credentials.newPassword} required />
  </div><br />
  <button type="submit" className="btn btn-primary">Reset Password</button>
</form>
    
    </>
  )
}

export default Changepassword