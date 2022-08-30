import React from 'react'
import { useNavigate } from "react-router-dom";

function SignupForm() {
  let navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
   
    navigate("/projects", { replace: true });
    debugger
    
  }

  return(
    
  <form onSubmit={handleSubmit}>
    <h1>Welcome Back to Due Date</h1>
    <div className="input-container">
         <label>Username </label>
         <input type='text' name='name'  />

         
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type='password' name='password'  />

  
       </div>
       <div className="button-container">
         <input type="submit" />
       </div>
  </form>
  ) 
}

export default SignupForm