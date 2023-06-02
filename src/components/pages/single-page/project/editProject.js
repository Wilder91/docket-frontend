import React, {useEffect, useState} from 'react';

import dayjs from 'dayjs';
function editProject({ user, setUser, project, setProjects, setMilestones, setEditFormOpen }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  
  function updateProject(data) {
    setProjects((prevProjects) => {
      const updatedProjects = prevProjects.map((project) => {
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
          const dueDate = dayjs(data.due_date).subtract(milestone.lead_time, 'day');
          const updatedMilestone = { ...milestone, project_name: data.name, due_date: dueDate };
          updateMilestone(updatedMilestone);
          return updatedMilestone;
        } else {
          return milestone;
        }
      });
  
      setMilestones(updatedMilestones);
  
      // Update user milestones array
      setUser((prevUser) => {
        const updatedUser = { ...prevUser, milestones: updatedMilestones };
        return updatedUser;
      });
  
      return updatedMilestones;
    });
  }

  

  function handleSubmit(e) {
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
      setMessage("Project updated!");
      e.target.reset();
    })
    .catch((error) => {
      console.error(error);
      setErrors({ general: "An error occurred while updating the project." });
      console.log(errors)
    });
  }

  function updateMilestone(milestone) {
    return fetch(`http://localhost:3000/milestones/${milestone.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: milestone.name,
        due_date: milestone.due_date
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
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    setName(project.name);
    setKind(project.kind);
    setDate(project.due_date);
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