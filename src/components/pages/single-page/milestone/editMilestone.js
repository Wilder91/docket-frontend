import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

function editMilestone({user, setUser, milestone, milestones, setMilestones }) {
  const [name, setName] = useState(milestone.name);
  const [date, setDate] = useState(milestone.due_date);

  const [message, setMessage] = useState("");
  const [updatedMilestone, setUpdatedMilestone] = useState(null);

  let handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
  
    fetch(`http://localhost:3000/milestones/${milestone.id}`, {
      method: 'PATCH',
     
      body: JSON.stringify({
        name: name,
        due_date: date,
        project_name: milestone.project_name,
      }),
      headers: new Headers({
        Authorization: `${sessionStorage.token}`,
        'Content-Type': 'application/json'
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // Update the milestones array in the user object
        const updatedMilestones = user.milestones.map((m) =>
          m.id === data.id ? data : m
        );
        setUser((prevUser) => ({ ...prevUser, milestones: updatedMilestones }));
        setUpdatedMilestone(data);
        setMessage("Milestone updated successfully.");
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    console.log(user)
    if (updatedMilestone) {
      setName(updatedMilestone.name);
      setDate(updatedMilestone.due_date);
      setMilestones(milestones.map(m => m.id === updatedMilestone.id ? updatedMilestone : m).sort((a, b) => new Date(a.due_date) - new Date(b.due_date)));
    } 
  }, [updatedMilestone, milestones, setMilestones]);

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Milestone Details</h1>

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Date</Form.Label>
        <Form.Control required type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </Form.Group>

      <button className='normal' type="submit">Update</button>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </Form>
  )
}

export default editMilestone;