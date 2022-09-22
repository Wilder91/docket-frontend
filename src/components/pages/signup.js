import React from 'react';
import {NavLink} from 'react-router-dom';


function Signup() {

  
 
    return (


<div className="form-container">

  <div className="vertical-center">
  

     <form>
     <h1>Create Your Account</h1>
       <div className="input-container">
         <label>Username </label>
         <input type="text" name="uname" required />
         
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" required />
  
       </div>
       <div className="button-container">
         <input type="submit" />
       </div>
       
     </form>
     <NavLink to='/'>Return to Login Page</NavLink>
  
     </div>
</div>

   )
  }
  



export default Signup;