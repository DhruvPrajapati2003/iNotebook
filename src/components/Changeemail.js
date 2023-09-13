import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Changeemail = () => {



    const host="http://localhost:5000"

    const [credentials, setcredentials] = useState({currentemail:"",password:"",newEmail:""})
    const navigate = useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/changeemail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({currentemail:credentials.currentemail,password:credentials.password,newEmail:credentials.newEmail}),
        });
         
    
        const json = await response.json();
        console.log(json)
        if(json.success){
           localStorage.setItem('token',json.token);
           navigate('/login');
           alert("Your Email Has Been Changed")

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
     <h2 className='my-3'>Reset Email</h2>
    <form onSubmit={handleSubmit} className='my-3'>
  <div className="form-group">
    <label htmlFor="currentemail">Current Email</label>
    <input type="email" className="form-control" id="currentemail" aria-describedby="emailHelp"
     placeholder="Enter Current Email" name='currentemail' onChange={onchange} value={credentials.currentemail} required />
  </div>
  <div className="form-group my-2">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password"  name='password' placeholder="Password" onChange={onchange} value={credentials.password} required />
  </div>
  <div className="form-group">
    <label htmlFor="newEmail">New Email</label>
    <input type="email" className="form-control" id="newEmail" aria-describedby="emailHelp"
     placeholder="Enter New Email" name='newEmail' onChange={onchange} value={credentials.newEmail} required />
  </div><br />
  <button type="submit" className="btn btn-primary">Reset Email</button>
</form>
    
    </>
  )
}

export default Changeemail