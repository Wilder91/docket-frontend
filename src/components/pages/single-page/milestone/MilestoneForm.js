import React, { useState } from 'react';

function MilestoneForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/milestones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, date })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error submitting form');
      }
      // Handle successful form submission
    })
    .catch(error => {
      setErrorMessage(error.message);
    });
  };

  return (
    <form className='embed' onSubmit={handleSubmit}>
      <h1>New Milestone</h1>
      <input required
        type="text"
        value={name}
        placeholder="Name"
        className='input-container'
        onChange={(e) => setName(e.target.value)}
      />

      <br></br>
      <input
        type="text"
        value={description}
        placeholder="Description(50 character limit)"
        className='input-container'
        maxLength={50}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <br></br>

      <input required
        type="date"
        value={date}
        placeholder="Date"
        className='input-container'
        onChange={(e) => setDate(e.target.value)} 
      />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default MilestoneForm