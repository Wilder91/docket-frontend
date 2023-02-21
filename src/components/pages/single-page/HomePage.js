

import React, { useEffect, useState} from 'react'
import { NavLink, useNavigate} from 'react-router-dom';

import ProjectForm from './project/ProjectForm'
import dayjs from 'dayjs'

import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'



function HomePage() {
  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] =useState([]);
  const [templates, setTemplates] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.token;
  const navigate = useNavigate();
 
  function fetchUsers()  {
   
    fetch(`http://localhost:3000/users/`, {
      method: 'GET',
      headers: new Headers( {
      Authorization: token,
      })
    })
    .then(result => result.json())
    .then(users => setterFunction(users)) 
  }

  function setterFunction(users){
      
      let user = users.find(u => u.email === localStorage.email)
      setUser(user)
      let p = user.projects.sort(function(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
      });
      let m = user.milestones.sort(function(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
      });
      setTemplates(user.templates)
      localStorage.user_id = user.id
      setProjects(p)
      setMilestones(m)
   
      
      
   
    
  }
  
  
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  

  function deleteProject(id) {
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

  const getTemplates = () => {
    
    let path = '/templates'
    navigate(path, {state:{hello:'hello', templates: templates}});
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

  function removeMilestone(id) {      
    setMilestones(milestones.filter(p =>
        p.id !== id
      )
    )
  }

  
  useEffect(() => {
    
    fetchUsers();               
  }, []);

   
  return (
    
    <div className='page'>
     
    <h1>{user.name}'s Projects</h1>   

    
    <br />
    
    <>
    <button className="normal" onClick={showModal}>Add Project</button>
      <Modal className='bootmodal' show={isOpen} onHide={hideModal}>
        
        <Modal.Body><ProjectForm setProjects={setProjects} templates={templates} setMilestones={setMilestones}/></Modal.Body>
        
      </Modal>
      </>
   
 <button className='normal' onClick={getTemplates}>Templates</button>
    
    
    <br />

    <ul>
      
    {projects === 'undefined' && <h5>Nothing Here, Yet!</h5>}
    {projects.length === 0 &&
      
  <h5>No projects (yet)</h5> }
 
  <Card style={{background: 'none', border: 'none', display: 'inline'}}>
      {projects.map(project => (<li key={project.id}>  
      <div className="card-title"><NavLink className="project-names" to={`/projects/${project.id}`} state={{user: {user}, project: {project}, milestones: {milestones}}}>  
      {project.name}   </NavLink> </div>
      
      <div className="card-body">
      {project.kind}<br></br> Deadline | {dayjs(project.due_date).format("MM.DD.YYYY")}
     </div>
      <button className='normal'  onClick={() => {deleteProject(project.id)}}>delete</button>    </li>
      ))}
    </Card>
      <br />
      <br />
      <h1>Active Milestones</h1>
      <br></br>
      {milestones.length === 0 &&
  
  <h5>No milestones (yet)</h5> }
      {milestones.map(milestone => 
      (<li key={milestone.id}>  <b>{milestone.name} </b><br />{projects.find((item) => item.id === milestone.project_id).name}   <br></br> {milestone.description}<br></br> Due Date: {dayjs(milestone.due_date).format('MM.DD.YYYY')} <br /> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>delete</button>   </li>
      ))}       

        <br></br>
        <NavLink to="/logout">Logout</NavLink>
        </ul> 
    </div>
  )
        
}
        



export default HomePage