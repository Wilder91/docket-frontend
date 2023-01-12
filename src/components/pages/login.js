import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Logo from '../images/DDLogo.png'

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.email = email
    localStorage.password = password
    navigate('/home');
  
  }



  return (
    <div>
   
    <form className='normal' onSubmit={handleSubmit}>
    <img src={Logo} alt="logo"></img> 
    <br />
      <h3>Due Date </h3>
      
     
      <div>
     
        <input required className = "input-container"
        placeholder="E-Mail Address"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div >
        <input required className = "input-container"
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br></br>
      <button type="submit" className="nice-button">Log In</button>
      <br />
       <button data-href="/signup" className="signup-button" type="button"> Sign Up</button>
      <br></br>
    
    </form>
   
    </div>
  );
}

export default LoginForm