import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function MilestoneForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setErrorMessage('');
  }, [name, description, date]);

  useEffect(() => {
    const isValid = name.trim() !== '' && date.trim() !== '';
    setFormValid(isValid);
  }, [name, description, date]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

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
    <Form className='embed' onSubmit={handleSubmit}>
      <h1>New Milestone</h1>
      <Form.Group controlId='formMilestoneName'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          value={name}
          placeholder='Name'
          onChange={handleNameChange}
          required
        />
      </Form.Group>
      <Form.Group controlId='formMilestoneDescription'>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type='text'
          value={description}
          placeholder='Description (50 character limit)'
          maxLength={50}
          onChange={handleDescriptionChange}
        />
        <Form.Text>
          {description.length}/{50}
        </Form.Text>
      </Form.Group>
      <Form.Group controlId='formMilestoneDate'>
        <Form.Label>Date</Form.Label>
        <Form.Control
          type='date'
          value={date}
          placeholder='Date'
          onChange={handleDateChange}
          required
        />
      </Form.Group>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Button type='submit' disabled={!formValid}>Submit</Button>
    </Form>
  );
}

export default MilestoneForm;