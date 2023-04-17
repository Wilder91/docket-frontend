import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import dayjs from 'dayjs';

function MilestoneForm({ project, milestones, setMilestones, hideMilestoneForm }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
  }, [name, date]);

  useEffect(() => {
    const isValid = name.trim() !== '' && date.trim() !== '';
    setFormValid(isValid);
  }, [name, date]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  function addMilestone(data) {
    setMilestones((milestones) => [
      ...milestones,
      {
        id: data.id,
        name: data.name,
        description: data.description,
        due_date: data.due_date,
        project_id: data.projectId,
        project_name: data.project_name,
      },
    ].sort((a, b) => new Date(a.due_date) - new Date(b.due_date)));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/milestones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.token}`,
      },
      body: JSON.stringify({
        name: name,
        date: date,
        lead_time: dayjs(date).diff(dayjs(project.due_date), 'days'),
        project_name: project.name,
        project_id: project.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error submitting form');
        }
        return response.json(); // parse the response body as JSON
      })
      .then((data) => {
        addMilestone(data);
        setFormMessage('Milestone created successfully.');
        setTimeout(function () {
          setFormMessage('');
          hideMilestoneForm();
          setName('');
          setDate('');
        }, 1000);
      })
      .catch((error) => {
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
      {formMessage && <p style={{ color: 'green' }}>{formMessage}</p>}
      <Button type='submit' disabled={!formValid}>
        Submit</Button>
    </Form>
  );
}

export default MilestoneForm;