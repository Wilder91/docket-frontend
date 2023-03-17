import React, {useEffect, useState} from 'react'
import { NavLink} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FaFlag } from 'react-icons/fa';
import dayjs from 'dayjs';


function projectList({user, projects, setProjects}) {
    const [project, setProject] = useState([])
    const [milestones, setMilestones] = useState([])
    const [editFormOpen, setEditFormOpen] = useState(false);
    const today = dayjs()
    const token = localStorage.token
    
    function projectMilestones(id) {
        milestones.filter(m => m.project_id === id)
      }

    function deleteProject(id) {
        let projectMilestones = milestones.filter(m => m.project_id === id)
        projectMilestones.map(m => deleteMilestone(m.id))
        fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' ,headers: new Headers( {
          Authorization: `${token}`,
          })} ) 
        removeProject(id)  
      }

      function deleteMilestone(id) {
        fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE', headers: new Headers( {
          Authorization: `${token}`,
          }) }) 
        removeMilestone(id)
      }

      function removeProject(id) {  
        let p_id = id    
        setProjects(projects.filter(p =>
          p.id !== id
        )
      )
      
      
        setMilestones(milestones.filter(p =>
            p.project_id !== p_id
          )
        )
        
      }
    
      /* removes a specific milestone from the DOM */
      function removeMilestone(id) {      
        setMilestones(milestones.filter(p =>
            p.id !== id
          )
        )
      }

    const showEditForm = (id) => {
        const project = user.projects.find(
          p => p.id === id
        );
        setProject(project)
        setEditFormOpen(true);
    
      }
    useEffect(() => {
        console.log(window.location)
        console.log(user.name);               
      }, []);
    return(
        <div>
        <h1>Projects</h1>
        <br />
    
        <ul>
          
        {projects === 'undefined' && <h5>Nothing Here, Yet!</h5>}
        {projects.length === 0 &&
          
      <h5>No projects (yet)</h5> }
     
      <Card style={{background: 'none', border: 'none', display: 'inline' }}>
        {projects.map(project => (
        <li key={project.id}>
        {project.complete === true &&
        
        <h5>complete</h5> }  
        <div className="card-title"><FaFlag onClick={() => console.log(project.id)} style={{color: project.complete ? "grey" : "red"}}/> 
        <br/>
    <NavLink  to={`/projects/${project.id}`} state={{user: {user}, project: {project}}} >  
        {project.name}   </NavLink> </div>
        
        <div className="card-body">
        {project.kind}
        <br/> Deadline | {dayjs(project.due_date).format("MM.DD.YYYY")}
        <br />
        {project.complete === false &&  `${dayjs(project.due_date).diff(today, 'day')} days remaining `} 
        <br />
        <button className='normal' onClick={() => {showEditForm(project.id)}}>edit</button>   
        <button className='normal' onClick={() => {deleteProject(project.id)}}>delete</button> 
        </div>  
        </li>
          ))}
        </Card>
        </ul>
        </div>
    )
}

export default projectList