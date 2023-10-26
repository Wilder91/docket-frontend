import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function login() {
    fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password })
    })
      .then((resp) => resp.json())
      .then((data) => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('email', data.email);
        console.log(window.sessionStorage.token);
        navigate('/', { replace: true });
      });
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.token,
        },
      })
      
      if (res.status === 201) {
        setEmail("");
        setPassword("");
        alert("Successfully created account.");
        login(); // Call login function after successful sign up
        // Redirect to login page
      } else {
        let data = await res.json();
        alert(data.errors);
        console.log(data)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <Form className="normal" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="signup-button">
          Sign Up
        </Button>
        <br />
        <br />
        <a href="/">Return to Log In</a>
      </Form>
    </div>
  );
}

export default Signup;