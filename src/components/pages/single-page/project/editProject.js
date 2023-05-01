import React, {useEffect, useState} from 'react';

import dayjs from 'dayjs';
function editProject({user, project, setProjects, setMilestones, setEditFormOpen, ini}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [message] = useState("");
 
  const [errors, setErrors] = useState({}); 

  function updateProject(data) {
    console.log(user);
    
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
        console.log(data)
        if (project.id === data.id) {
          return { ...project, ...data };
        } else {
          return project;
        }
      });
      return updatedProjects;
    });
    setMilestones((prevMilestones) => {
      const updatedMilestones = prevMilestones.map((milestone) => {
        if (milestone.project_id === data.id) {
          let dueDate = dayjs(data.due_date).subtract(milestone.lead_time, 'day');
          console.log(dueDate)
          return { ...milestone, project_name: data.name,  due_date:dueDate}; // <-- modify the milestone object with the updated project_name
        } else {
          return milestone;
        }
      });
      return updatedMilestones;
    });
  }
  

 
  let handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:3000/projects/${project.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        kind: kind,
        due_date: date
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
      return response.json();
    })
    .then((data) => {
      updateProject(data);
      
      setEditFormOpen(false);
      e.target.reset();// <-- reset the form inside the second .then() block
    })
    .catch((error) => {
      console.error(error);
    });
  };




useEffect(() => {
   console.log(user)
  setName(project.name)
  setKind(project.kind)
  setDate(project.due_date) 

  
}, []);

  return (
  <form className='embed' onSubmit={handleSubmit}>
    <h1>Project Details</h1>

    <input required
      type="text"
      defaultValue={project.name}  
      className='input-container'
      onChange={(e) => setName(e.target.value)}
    />
    <br></br>
    <input 
      type="text"
      defaultValue={project.kind}      
      className='input-container'
      maxLength={50}
      onChange={(e) => setKind(e.target.value)}
    />
    <br></br>
    <input required
      type="date"
      defaultValue={project.due_date}
      className='input-container'
      onChange={(e) => setDate(e.target.value)}
    />
    <br />

  
    <button className='normal' type="submit">Update</button>
    <div className="message">{message ? <p>{message}</p> : null}</div>
    
</form>
  )
}

export default editProject