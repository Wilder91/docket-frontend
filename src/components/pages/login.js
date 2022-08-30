import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';


class Login extends Component {
  render() {
    return (


<div className="form-container">

  <div className="vertical-center">
  
  <h1>Welcome Back to Due Date!</h1>
     <form>
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
     </div>
</div>

   )
  }
  
}



export default Login;
