import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function ProjectForm({ user, setUser, setProjects, templates, milestones, setMilestones }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [kind, setKind] = useState('');
  const [template, setTemplate] = useState('');
  const [formMessage, setFormMessage] = useState('');

  function handleChange(e) {
    setTemplate(e.target.value);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setName('');
    setDate('');
    setKind('');
    setTemplate('');

    fetch(`http://localhost:3000/users/${sessionStorage.user_id}/projects`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        kind: kind,
        due_date: date,
        user_id: sessionStorage.user_id,
        template: template,
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
        setFormMessage('Project created successfully.');
        return response.json();
      })
      .then((data) => {
        addProject(data);
      })
      .catch((error) => {
        console.error(error);
        setFormMessage('Error creating project.');
      });
  };

  // Filter templates to show only the ones assigned to the user
  const userTemplates = templates.filter((template) => template.user_id === user.id);

  function addProject(project) {
    setProjects((projects) => [
      ...projects,
      { id: project.id, name: project.name, due_date: project.due_date, kind: project.kind, user_id: project.userId },
    ].sort(function (a, b) {
      return new Date(a.due_date) - new Date(b.due_date);
    }));

    setUser((prevUser) => {
      const updatedProjects = [...prevUser.projects, project];
      return { ...prevUser, projects: updatedProjects };
    });

    // Find the template based on name and user_id
    const thisTemplate = userTemplates.find((t) => t.name === template);
    if (thisTemplate) {
      const arrTwo = thisTemplate.milestones;
      
      arrTwo.forEach((m) => {
        m.project_name = project.name;
        m.complete = false;
        m.project_id = project.id;
        m.lead_time = parseInt(m.leadTime);
        m.due_date = dayjs(project.due_date).subtract(m.lead_time, 'day').format('MM.DD.YYYY')
        console.log(dayjs(project.due_date).subtract(m.lead_time, 'day').format('MM.DD.YYYY'))
      
      });
     

      setMilestones((milestones) => [...milestones, ...arrTwo].sort(function (a, b) {
        return new Date(a.due_date) - new Date(b.due_date);
      }));
      
      setUser((prevUser) => {
        const updatedMilestones = [...prevUser.milestones, ...arrTwo];
        return { ...prevUser, milestones: updatedMilestones };
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='formProjectName'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          type='text'
          placeholder='Enter project name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId='formProjectKind'>
        <Form.Label>Type of Project: (You Can Also Use a Template)</Form.Label>
        <Form.Control 
        type='text'
         value={kind} 
         placeholder='ex: "Wedding Invite Suite'
         onChange={(e) => setKind(e.target.value)}>
          
         </Form.Control>
      </Form.Group>

      <Form.Group controlId='formProjectTemplate'>
        <Form.Label></Form.Label>
        <Form.Control
          as='select'
          aria-label='Default select example'
          onChange={handleChange}
          style={{ textTransform: 'capitalize' }}
        >
          <option value=''>No Template</option>
          {userTemplates.map((template) => (
            <option key={template.id} value={template.name}>
              {template.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId='formProjectDueDate'>
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          required
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Create Project
      </Button>

      <p>{formMessage}</p>
    </Form>
  );
}

export default ProjectForm;