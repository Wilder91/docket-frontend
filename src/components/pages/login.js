import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../pages/single-page/util/context';
import { GoogleLogin } from '@react-oauth/google'; // Import GoogleLogin from @react-oauth/google

function LoginForm() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  function login() {
    // You can add client-side validation here (e.g., checking if the email and password are not empty)
  
    // Send a request to your server for authentication
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Authentication error');
        }
      })
      .then((data) => {
        // Handle a successful login here
        // For example, store the user's token in session storage or cookies
        const { token, email } = data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
  
        // Set the login status to "success"
        setLoginStatus('success');
  
        // Fetch user data or perform other actions if needed
        fetchUsers();
      })
      .catch((error) => {
        // Handle authentication error
        console.error('Authentication error:', error);
        if (error.message === 'Authentication error') {
          // Handle specific authentication error, e.g., incorrect credentials
          setErrorMessage('Incorrect Email or Password');
        } else {
          // Handle other authentication errors
          setErrorMessage('Server is currently unavailable. Please try again later.');
        }
  
        // Set the login status to "failure"
        setLoginStatus('failure');
      });
  }

  function fetchUsers() {
    fetch(`http://localhost:3000/users/`, {
      method: 'GET',
      headers: new Headers( {
        Authorization:sessionStorage.customAuthToken,
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
  function handleGoogleLogin(response) {
    // This function will be called when Google Sign-In is successful.
    // You can handle the successful sign-in and send the Google authentication token to the backend here.
    console.log('Google sign-in successful:', response);
    
    // Extract the Google authentication token and email from the response
    const google_token = response.credential;
    const decodedToken = JSON.parse(atob(google_token.split('.')[1])); 
    console.log(decodedToken)// You should verify the actual structure of the response object
    const google_email = decodedToken.email; // Assuming this structure, update accordingly
  
    // Set the Google email in sessionStorage
    sessionStorage.setItem('email', google_email);
    sessionStorage.setItem('google_token', google_token)
    // Send the Google authentication token to the backend
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ google_token }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Authentication error');
        }
      })
      .then((data) => {
        // Handle the response from the backend, which may include a custom authentication token
        const customAuthToken = data.token;
        console.log(data);
  
        // Store the custom authentication token in session storage or elsewhere
        sessionStorage.setItem('token', customAuthToken);
  
        // Redirect to the home page or protected route
        console.log(sessionStorage);
        fetchUsers();
        navigate('/');
      })
      .catch((error) => {
        // Handle authentication error
        console.error('Authentication error:', error);
        setErrorMessage('Failed to authenticate with Google. Please try again later.');
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    login();
  }

  useEffect(() => {
    if (sessionStorage.token) {
      // Redirect to the home page if logged in
      navigate('/');
    }
  }, [navigate]);

  function findUser(users) {
    let user = users.find(u => u.email === sessionStorage.email);
    setUser(user);
  }

  function routeChange() {
    let path = '/signup';
    navigate(path, { state: { login } });
  }

  // Use useEffect to navigate to the home page if login was successful
  useEffect(() => {
    if (loginStatus === 'success' && user) {
      navigate('/', { user: user });
    }
  }, [loginStatus, navigate, user]);

  return (
    <div>
      <div id='signinDiv'></div>
      <UserContext.Provider value={[user, setUser]}>
        <form className='normal' onSubmit={handleSubmit}>
          <img src='/2.png' id='DDLogo' className='LoginLogo' alt="logo"></img>
          <br />
          <h3>Docket</h3>
          <div>
            <input
              required
              className="input-container"
              placeholder="E-Mail Address"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              required
              className="input-container"
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
          <br></br>
          <button type="submit" className="nice-button">
            Log In
          </button>
          <br />
          <button onClick={routeChange} className="signup-button" type="button">
            Sign Up
          </button>
          <br></br>
          <div className='google-button'>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            
            onError={() => {
              console.log('Login Failed');
            }}
            shape='pill'

          /></div>
        </form>
      
          {/* Implement Google Sign-In using the `GoogleLogin` component from @react-oauth/google */}
          
    
      </UserContext.Provider>
    </div>
  );
}

export default LoginForm;