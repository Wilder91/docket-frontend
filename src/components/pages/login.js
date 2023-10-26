import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {UserContext} from '../pages/single-page/util/context'

function LoginForm() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [loginStatus, setLoginStatus] = useState(''); // Add login status state
  const navigate = useNavigate();

  function login() {
    fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: email, password: password})
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {    
      console.log(data)
      sessionStorage.setItem("token", data.token)
      sessionStorage.setItem("email", data.email)
      setLoginStatus("success")
      fetchUsers(); // Call fetchUsers() here
    })
    .catch(error => {
      console.error('Error logging in:', error);
      if (error.message === 'Network response was not ok') {
        setErrorMessage("Incorrect Email or Password");
      } else {
        setErrorMessage("Server is currently unavailable. Please try again later.");
      }
      setLoginStatus("failure")
    });
  }
    
  function fetchUsers() {
    fetch(`http://localhost:3000/users/`, {
      method: 'GET',
      headers: new Headers( {
        Authorization: window.sessionStorage.token,
      })
    })
    .then(result => {
      if (result.ok) {
        return result.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(users => {
      findUser(users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
  }

  useEffect(() => {
    if (sessionStorage.token) {
      // Redirect to the home page if logged in
      navigate('/');
    }
  }, [navigate]);

  function findUser(users) {
    let user = users.find(u => u.email === sessionStorage.email)
    setUser(user)
  }

  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  // Use useEffect to navigate to home page if login was successful
  useEffect(() => {
    if (loginStatus === 'success' && user) {
      navigate('/', {user: user});
    }
  }, [loginStatus, navigate, user]);

  function routeChange() { 
    let path = '/signup'; 
    navigate(path, {state: {login}});
  }

  return (
    <div>  
        <div id='signinDiv'></div>
      <UserContext.Provider value={[user, setUser]}>
        <form className='normal' onSubmit={handleSubmit}>
          <img src='/2.png' id='DDLogo' className='LoginLogo' alt="logo"></img> 
          <br />
          <h3>Docket </h3>
          <div>
            <input required className = "input-container"
              placeholder="E-Mail Address"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input required className = "input-container"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <br></br>
          <button type="submit" className="nice-button">Log In</button>
          <br />
          <button onClick={() => { routeChange() }} className="signup-button" type="button"> Sign Up</button>
          <br></br>  
        </form>   
      </UserContext.Provider>
    </div>
  );
}

export default LoginForm