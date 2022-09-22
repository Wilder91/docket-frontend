import React from 'react'
import {useNavigate, NavLink} from 'react-router-dom'

function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.email = email
    localStorage.password = password
    navigate('/user');
  
  }



  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h1>Welcome Back To Due Date!</h1>
      <div>
        <input
        placeholder="E-Mail Address"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br></br>
      <button type="submit">Submit</button>
      <br></br>
      
    </form>
    <br></br>
    <p>Don't Have An Account? <NavLink to="/signup"> Sign Up</NavLink></p>
     </div>
  );
}

export default LoginForm