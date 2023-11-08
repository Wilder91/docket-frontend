import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

function MilestoneNotes({ milestone, setMilestones }) {
  const [notes, setNotes] = useState(milestone.notes || ''); // Initialize with milestone.notes
  const [message, setMessage] = useState(null);
  const token = sessionStorage.token;

  const handleNotesChange = (event) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
  }

  const handleSaveClick = () => {
    const data = {
      notes: notes,
    };
  
    const method = milestone.notes ? 'PATCH' : 'POST';
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    fetch(`http://localhost:3000/milestones/${milestone.id}/notes`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Notes saved successfully');
        setMilestones((prevMilestones) => prevMilestones.map((m) => 
          m.id === milestone.id ? { ...m, notes: data.notes } : m
        ));
      })
      .catch((error) => {
        setMessage('Error saving notes');
        console.error('Error saving notes:', error);
      });
  }

  return (
    <Form>
      <Form.Control
        as="textarea"
        value={notes}
        onChange={handleNotesChange}
        rows="8"
        cols="50"
        placeholder={notes ? "Enter your notes here..." : "No notes available."}
      />
      <br />
      <p className='account-delete-button' onClick={handleSaveClick}>Save</p>
      {message && <p>{message}</p>}
    </Form>
  );
}

export default MilestoneNotes;
