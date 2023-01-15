import React, { useEffect, useState} from 'react'
import { NavLink} from 'react-router-dom';

import ProjectForm from './project/ProjectForm'

function HomePage() {
  const [user, setUser] = useState([])
  const [projects, setProjects] = useState([])
  const [milestones, setMilestones] =useState([])
  const [showForm, setShowForm] = useState()
  
  
  


    const fetchUsers = () => {
        fetch(`http://localhost:3000/users/`)
        .then(result => result.json())
        .then(users => setterFunction(users)) 
    }

    function setterFunction(users){
    let user = users.find(email => email.email === localStorage.email)
    
    setUser(user)

    let p = user.projects.sort(function(a,b){
      return new Date(a.due_date) - new Date(b.due_date);
    });
    localStorage.user_id = user.id
    setProjects(p)
    fetchMilestones()
    }

    const fetchMilestones = () => {
      fetch(`http://localhost:3000/users/${localStorage.user_id}/milestones`)
      .then(result => result.json())
      .then(milestones => setMilestones(milestones))      
    }
    


    function deleteProject(id) {
      fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' }) 
      removeProject(id)  
    }

    function deleteMilestone(id) {
      fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE' }) 
      removeMilestone(id)
    }


    function removeProject(id) {      
      setProjects(projects.filter(p =>
          p.id !== id
        )
      )
    }

    function removeMilestone(id) {      
      setMilestones(milestones.filter(p =>
          p.id !== id
        )
      )
    }

    
    useEffect(() => {
        fetchUsers({});               
    }, []);

    
  return (
    
    <div className='page'>
     
    <h1>{user.name}'s Projects</h1>   <h4 onClick = {() => setShowForm(true)} className = 'page'>Start a Project</h4> 
    <br />
    
    { showForm    
            ? <div className = 'Menu'>  
                <div onClick = {() => setShowForm(false)} className = 'Invisible'></div>
                <ProjectForm setProjects={setProjects}/>
                </div>
                : null
                }
    <ul>
        
        {projects.map(project => (<li key={project.id}>  <NavLink className="project-names" to={`/projects/${project.id}`} 
        state={{user: {user}, projects: {projects}, milestones: {milestones}}}>  
        {project.name}   </NavLink>
        <br></br> 
        {project.kind}<br></br> Deadline | {project.due_date} <button className='normal' onClick={() => {deleteProject(project.id)}}>delete</button>   </li>
        ))}
       
        <br />
        <br />
        <h1>Active Milestones</h1>
        <br></br>
        {milestones.map(milestone => (<li key={milestone.id}>  <b>{milestone.name}</b>  <br></br> {milestone.description}<br></br> Due Date: {milestone.due_date} <br /> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>delete</button>   </li>
        ))}       

        <br></br>
        <NavLink to="/logout">Logout</NavLink>
        </ul> 
    </div>
  )
        
}
        



export default HomePage