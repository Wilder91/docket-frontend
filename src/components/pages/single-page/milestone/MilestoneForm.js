import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function MilestoneForm({project, milestones, setMilestones}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setErrorMessage('');
    console.log(project)
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

  function addMilestone(data){
    console.log(data)
    setMilestones(milestones => [...milestones, {id: data.id, name: data.name, description: data.description, due_date: data.due_date, project_id: data.projectId, project_name: data.project_name}].sort(function(a,b){ return new Date(a.due_date) - new Date(b.due_date)}
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    fetch('http://localhost:3000/milestones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.token}`
      },
      body: JSON.stringify({ 
        name: name,
        description: description, 
        date: date, 
        project_name: project.name,
        project_id: project.id })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error submitting form');
      }
      return response.json(); // parse the response body as JSON
    })
    .then(data => {
      addMilestone(data); // call addMilestone with the parsed data
    })
    .catch(error => {
      setErrorMessage(error.message);
    });
  }

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