import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form';

function projectForm(props) {
  
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [template, setTemplate] = useState("")
  const [message] = useState("");
  const {userId} = useParams();


  
  function handleChange(e) {
    setTemplate(e.target.value);
  
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

  
    props.setProjects( projects => [...projects,{id: project.id, name: project.name, due_date: project.due_date, kind: project.kind, user_id: project.userId}].sort(function(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
      }) )

  }
let handleSubmit = (e) => {
    
    e.preventDefault();
    e.target.reset();
    setName('')
    setDate('')
    setKind('')
    setTemplate('')
      fetch(`http://localhost:3000/users/${localStorage.user_id}/projects`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          kind: kind,
          date: date,
          user_id: userId,
          template: template
        }),
        headers: new Headers( {
          Authorization: `${localStorage.token}`, 
          'Content-Type': 'application/json'
        }),
      }).then((response) => response.json())
      .then((data) => addProject(data))
    };

 

    return (
    <Form className='embed' onSubmit={handleSubmit}>
    <h1>New Project</h1>
    
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
      value={kind}
      placeholder="Type"
      className='input-container'
      maxLength={50}
      onChange={(e) => setKind(e.target.value)}
    />
    <br></br>
    <input required
      type="date"
      value={date}
      placeholder="Date"
      className='input-container'
      onChange={(e) => setDate(e.target.value)}
    />
    <br></br>
    <Form.Select aria-label="Default select example"  onChange={handleChange} style={{textTransform: 'capitalize'}}>
    
      <option value="">No Template</option>
    {props.templates.map(template => 
    <option key={template.id} value={template.name}>{template.name}</option>) }
      
     
    </Form.Select>
   
    <br />
    <button className='normal' type="submit">Create</button>
    <div className="message">{message ? <p>{message}</p> : null}</div>
    <br />
 </Form>
    )
}

export default projectForm
