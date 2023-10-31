import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form'
function EditUser({ user, setUser,  setEditFormOpen }) {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');

  const [message, setMessage] = useState('');


  function updateUser(data) {
    setUser((prevUser) => {
      return { ...prevUser, ...data };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name,
        email,
   
      }),
      headers: new Headers({
        Authorization: `${sessionStorage.token}`,
        'Content-Type': 'application/json',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        updateUser(data);
        setEditFormOpen(false);
        setMessage('User updated!');
        setTimeout(() => setMessage(''), 2000);
        e.target.reset();
      })
     
  }

  useEffect(() => {
    // This useEffect is used for initializing the state when user changes
    console.log('UseEffect - user:', user);
    setName(user.name || '');
    setEmail(user.email || '');
  }, [user]); // Dependency array to re-run the effect when user changes

  return (
    <Form onSubmit={handleSubmit}>
       <Form.Label className='project-form-label'>Name</Form.Label>
      <Form.Control
        required
        type="text"
        value={name}
        className="input-container"
        onChange={(e) => {
          console.log('Name input value:', e.target.value);
          setName(e.target.value);
        }}
        
      />
      <br></br>
      <Form.Label className='project-form-label'>Email</Form.Label>
      <Form.Control
      
        type="text"
        value={email}
        className="input-container"
        maxLength={50}
        onChange={(e) => {
          console.log('Email input value:', e.target.value);
          setEmail(e.target.value);
        }}
      />
    
      <button className="normal" type="submit">
        Update
      </button>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </Form>
  );
}

export default EditUser;
