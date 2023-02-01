

import React, { useEffect, useState} from 'react'
import { NavLink} from 'react-router-dom';
import Modal from 'react-modal';
import ProjectForm from './project/ProjectForm'
import EditProject from './project/editProject'

function HomePage() {
  const [user, setUser] = useState([])
  const [projects, setProjects] = useState([])
  const [milestones, setMilestones] =useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const token = localStorage.token
  const fetchUsers = () => {
      fetch(`http://localhost:3000/users/`, {
        method: 'GET',
        headers: new Headers( {
        Authorization: `${token}`,
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
  localStorage.user_id = user.id
  setProjects(p)
  setMilestones(user.milestones)
  }
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openEdit() {
    setEditIsOpen(true);
  }

  function closeEdit() {
    setEditIsOpen(false);
  }

  

  function deleteProject(id) {
    fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' ,headers: new Headers( {
      Authorization: `${localStorage.token}`,
      })} ) 
    removeProject(id)  
  }

  function deleteMilestone(id) {
    fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE', headers: new Headers( {
      Authorization: `${localStorage.token}`,
      }) }) 
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
    console.log(window.location)
    fetchUsers({});               
  }, []);

    
  return (
    
    <div className='page'>
     
    <h1>{user.name}'s Projects</h1>   

    
 

<button className='normal' onClick={openModal}>Add Project</button>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Example Modal"
        
      >
        <ProjectForm setProjects={setProjects}/>
          </Modal>
          <br />
    <ul>
        
        {projects.map(project => (<li key={project.id}>  
        <NavLink className="project-names" to={`/projects/${project.id}`} 
        state={{user: {user}, project: {project}, milestones: {milestones}}}>  
        {project.name}   </NavLink>
        <br></br> 
        {project.kind}<br></br> Deadline | {project.due_date}
        <button className='normal' onClick={openEdit}>edit</button>
      <Modal
        isOpen={editIsOpen}
        ariaHideApp={false}
        onRequestClose={closeEdit}
        className="modal"
        contentLabel="Example Modal"
      >
        <EditProject project={project} /> 
          </Modal>
         <button className='normal' onClick={() => {deleteProject(project.id)}}>delete</button>    </li>
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