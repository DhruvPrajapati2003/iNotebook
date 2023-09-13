import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {


  const host="http://localhost:5000"



  const [credentials, setcredentials] = useState({name:"",email:"",password:"",number:""})
  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name:credentials.name, email:credentials.email,password:credentials.password,number:credentials.number}),
      });
       
  
      const json = await response.json();
      console.log(json)
      if(json.success){
         localStorage.setItem('token',json.token);
         navigate('/login');
  

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
    <h2 className='my-3'>Sign Up</h2>
    <form onSubmit={handleSubmit} className='my-3'>
    <div className="form-group">
     <label htmlFor="name">Enter Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp"
     placeholder="Enter name" name='name' onChange={onchange} value={credentials.name} required/>
  </div>
  <div className="form-group">
     <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
     placeholder="Enter email" name='email' onChange={onchange} value={credentials.email} required/>
  </div>
  <div className="form-group my-2">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password"  name='password' placeholder="Password" onChange={onchange} value={credentials.password} minLength={5} required/>
  </div>
  <div className="form-group">
     <label htmlFor="number">Enter Number</label>
    <input type="number" className="form-control" id="number" aria-describedby="emailHelp"
     placeholder="Enter number" name='number' onChange={onchange} value={credentials.number}minLength={10} maxLength={10} required/>
  </div>
  <button type="submit" className="btn btn-primary my-2">Signup</button>
</form>
    
    </>
  )
}

export default Signup