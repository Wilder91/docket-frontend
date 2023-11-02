import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

function AddTemplate({templates, setTemplates, user, setTemplateFormOpen}) {
  const [name, setName] = useState('');
  const [milestones, setMilestones] = useState([{ name: '', leadTime: '' }]);
  const [formMessage, setFormMessage] = useState('');

  function addTemplate(template) {
    console.log(template);
    setTemplates(templates => [...templates, template]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users/${sessionStorage.user_id}/templates`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        milestones: milestones,
      }),
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setFormMessage('Template created successfully.');
        setTimeout(function() {
          setTemplateFormOpen(false)
        }, 1000)
       
        return response.json();

      })
      .then((data) => addTemplate(data))
      .catch((error) => {
        console.error(error);
        setFormMessage('Error creating template.');
      });
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...milestones];
    newMilestones[index][field] = value;
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { name: '', leadTime: '' }]);
    
  };

  const deleteMilestone = (index) => {
    if (index === 0) return; // Prevent deleting the first milestone
    const newMilestones = [...milestones];
    newMilestones.splice(index, 1);
    setMilestones(newMilestones);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group  controlId='formTemplateName'>
        <Form.Label>Template Name</Form.Label>
        <Form.Control
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      {milestones.map((milestone, index) => (
  <Form.Group key={index} controlId={`formMilestone${index}`} className="milestone-group">
    <Row>
      <Col>
        <Form.Label className='milestone-name'>Milestone {index + 1}</Form.Label>
        <Form.Control 
          className='milestone-name-input'
          required
          type='text'
          value={milestone.name}
          onChange={(e) =>
            handleMilestoneChange(index, 'name', e.target.value)
          }
        />
      </Col>
      <Col>
        <Form.Label>Lead Time in Days</Form.Label>
        <Form.Control
          required
          className='milestone-lead-time-input'
          type='number'
          min='1'
          step='1'
          value={milestone.leadTime}
          onChange={(e) =>
            handleMilestoneChange(index, 'leadTime', e.target.value)
          }
        />
      </Col>
      <Col className='delete-button-col'>
        {index !== 0 && (
          <Button
            variant='danger'
            type='button'
            onClick={() => deleteMilestone(index)}
          >
            <div className='x'>⨉</div>
          </Button>
        )}
      </Col>
    </Row>
  </Form.Group>
))}
  <br />
  <b className='milestone-options-button'  onClick={addMilestone}>
    Add Milestone
  </b>
  <br />
  <Button className='normal' id='template-form-button'  type='submit'>
    Create Template
  </Button>
  <p>{formMessage}</p>
</Form> 
  )
}
export default AddTemplate