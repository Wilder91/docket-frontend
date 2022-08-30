import React, { Component } from 'react';
import {NavLink, useNavigate} from 'react-router-dom'

const handleSubmit = event => {
  event.preventDefault();
  useNavigate('/projects, { replace: true }');
};
class Landing extends Component {
  constructor() {
    super();
    this.state = {
      data: [], 
      username: "", 
      password: "",
    }
  }

  
  render() {
    return(
      <div className="form-container">

  <div className="vertical-center">

  
  <h1>Welcome Back to Due Date!</h1>
     <form className="login-form" onSubmit={handleSubmit}>
     
    
     <div className="input-container">
         <label>Password </label>
         <input type="text" name="name" required />
     </div>

       <div className="input-container">
         <label>Password </label>
         <input type="password" name="pass" required />
  
       </div>
       <div className="button-container">
         <input type="submit" />
       </div>
      
      
     </form>
     <p>Don't Have an Account? Create one<NavLink to='signup'> Here</NavLink></p>
     </div>
</div>

    )
  }
}


export default Landing