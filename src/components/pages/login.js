
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Logo from '../images/DDLogo.png'

function LoginForm() {
  
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
      console.log(window.localStorage.token)     
    })
   if(window.localStorage.token){
    navigate('/home')
   }
    
    
    
    
  }

 
  function handleSubmit(event) {
  event.preventDefault();
  login()
  if(window.localStorage.token){
    navigate('/home')
   }
  
 
  
  }
  function routeChange () { 
    let path = '/signup'; 
    navigate(path);
  }

  return (
    <div>  
    <form className='normal' onSubmit={handleSubmit}>
    <img src={Logo} id='DDLogo' alt="logo"></img> 
    <br />
      <h3>Duedate </h3>
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
    <button onClick={() => { routeChange() }} className="signup-button" type="button"> Sign Up</button>
    <br></br>  
    </form>   
    </div>
  );
}

export default LoginForm