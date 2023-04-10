import React, {useState} from 'react';

import {Form, Button} from 'react-bootstrap';

function projectForm({setProjects, templates, milestones ,setMilestones}) {
  
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [template, setTemplate] = useState("")

  const [formMessage, setFormMessage] = useState('');


  
  function handleChange(e) {
    setTemplate(e.target.value);
    console.log(templates)
    
    /*addMilestones(e.target.value);*/
  }

  /*function addMilestones(template){
    console.log(template)
    let t = props.templates.find(name => name = template)
    console.log(t)
    props.setMilestones( milestones => [...milestones,{id: milestone.id, name: milestone.name, due_date: milestone.due_date, kind: milestone.kind, project_id: milestone.projectId}].sort(function(a,b){
      return new Date(a.due_date) - new Date(b.due_date);
    }) )

  }*/

  function addProject(project) {
    
    setProjects( projects => [...projects,{id: project.id, name: project.name, due_date: project.due_date, kind: project.kind, user_id: project.userId}].sort(function(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
      }) )
  
    const thisTemplate = templates.find(t => t.name === template)
    if(thisTemplate){
    const arr_two = project.milestones
    arr_two.map(m => console.log(m.leadTime))
    console.log(project)

    console.log(arr_two)
    arr_two.map(m => m.project_name = project.name)
    arr_two.map(m => m.complete = false)
    arr_two.map(m => m.project_id = project.id)
   
    console.log(arr_two)
    setMilestones(milestones => [...milestones, ...arr_two].sort(function(a,b){
      return new Date(a.due_date) - new Date(b.due_date)}))

    
    }
  }
  let handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setName('');
    setDate('');
    setKind('');
    setTemplate('');
    console.log(sessionStorage);
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
        console.log(data); // <-- add this line to log the response
        addProject(data);
      })
      .catch((error) => {
        console.error(error);
        setFormMessage('Error creating project.');
      });
  };

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
      <Form.Label>Kind</Form.Label>
      <Form.Control
      
        type='text'
        value={kind}
        onChange={(e) => setKind(e.target.value)}
      >
        
      </Form.Control>
    </Form.Group>
      
    <Form.Group controlId='formProjectTemplate'>
    <Form.Label>Or Create from Template</Form.Label>
    <Form.Control
    as='select'
     aria-label="Default select example"  
     onChange={handleChange} 
     style={{textTransform: 'capitalize'}}>
    
    <option value="">No Template</option>
  {templates.map(template => 
  <option key={template.id} value={template.name}>{template.name}</option>) }
    
   
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
    )
}

export default projectForm
