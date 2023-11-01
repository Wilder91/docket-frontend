import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function EditTemplate({
  templates,
  setTemplates,
  user,
  setShowEditTemplateModal,
  setTemplateFormOpen,
  templateToEdit,
}) {
  const [name, setName] = useState(templateToEdit ? templateToEdit.name : '');
  const [milestones, setMilestones] = useState(
    templateToEdit ? templateToEdit.milestones : [{ name: '', leadTime: '' }]
  );
  const [formMessage, setFormMessage] = useState('');

 

  useEffect(() => {
    if (templateToEdit) {
      setName(templateToEdit.name);
      setMilestones(templateToEdit.milestones);
    } else {
      setName('');
      setMilestones([{ name: '', leadTime: '' }]);
    }
  }, [templateToEdit]);

  function updateTemplate(template) {
    setTemplates((templates) =>
      templates.map((t) => (t.id === template.id ? template : t))
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (templateToEdit) {
      // Handle editing an existing template
      console.log('Edit Template URL:', `http://localhost:3000/templates/${templateToEdit.id}`);
      console.log('Edit Template Request Data:', JSON.stringify({ name, milestones }));

      fetch(`http://localhost:3000/templates/${templateToEdit.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: name,
          milestones: milestones,
        }),
        headers: new Headers( {
          Authorization: `${sessionStorage.token}`, 
          'Content-Type': 'application/json'
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          setFormMessage('Template updated successfully.');
          return response.json();
        })
        .then((data) => {
          console.log('Edit Template Response Data:', data);
          updateTemplate(data);

          // Close the form 2 seconds after a successful update
          setTimeout(() => {
            setShowEditTemplateModal(false);
          }, 2000);
        })
        .catch((error) => {
          console.error('Edit Template Error:', error);
          setFormMessage('Error updating template.');
        });
    }
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
    <Form className='embed' onSubmit={handleSubmit}>
      <h1>{templateToEdit ? 'Edit Template' : 'New Template'}</h1>

      <Form.Group controlId='formTemplateName'>
        <Form.Label>Template Name</Form.Label>
        <Form.Control
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      {milestones.map((milestone, index) => (
        <Form.Group key={index} controlId={`formMilestone${index}`}>
          <Row>
            <Col>
              <Form.Label>Milestone {index + 1}</Form.Label>
              <Form.Control
                required
                type='text'
                value={milestone.name}
                onChange={(e) =>
                  handleMilestoneChange(index, 'name', e.target.value)
                }
              />
            </Col>
            <Col>
              <Form.Label>Lead Time</Form.Label>
              <Form.Control
                required
                type='number'
                min='1'
                step='1'
                value={milestone.leadTime}
                onChange={(e) =>
                  handleMilestoneChange(index, 'leadTime', e.target.value)
                }
              />
            </Col>
            <Col>
              {index !== 0 && (
                <Button
                  variant='danger'
                  type='button'
                  onClick={() => deleteMilestone(index)}
                >
                  Delete
                </Button>
              )}
            </Col>
          </Row>
        </Form.Group>
      ))}
      <br />
      <Button variant='secondary' type='button' onClick={addMilestone}>
        Add Milestone
      </Button>
      <br />
      <Button variant='primary' type='submit'>
        {templateToEdit ? 'Update' : 'Create'}
      </Button>
      <p>{formMessage}</p>
    </Form>
  );
}

export default EditTemplate;
