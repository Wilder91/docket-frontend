import React, {useState} from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import Logo from '../images/DDLogo.png'

function LoginForm() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function login() {
    fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, password: password})
    })
    .then(resp => resp.json())
    .then(data => {
    
      localStorage.setItem("token", data.token)
      localStorage.setItem("email", data.email)
      setUser(data.user)
      
    })
  }
  function handleSubmit(event) {
  event.preventDefault();
  login()
  console.log(user)
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
    <NavLink to="/signup">
     <button type="button" className='signup-button'>
          Sign Up
     </button>
  </NavLink>
   
    <br></br>  
    </form>   
    </div>
  );
}

export default LoginForm