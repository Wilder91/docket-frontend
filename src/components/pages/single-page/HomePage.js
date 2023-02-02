

import React, { useEffect, useState} from 'react'
import { NavLink} from 'react-router-dom';
import Modal from 'react-modal';
import ProjectForm from './project/ProjectForm'
import dayjs from 'dayjs'

function HomePage() {
  const [user, setUser] = useState([])
  const [projects, setProjects] = useState([])
  const [milestones, setMilestones] =useState([])
  const [modalIsOpen, setIsOpen] = useState(false);

  const token = localStorage.token

  async function fetchUsers()  {
    console.log(token)
    await fetch(`http://localhost:3000/users/`, {
      method: 'GET',
      headers: new Headers( {
      Authorization: token,
      })
    })
    .then(result => result.json())
    .then(users => setterFunction(users)) 
  }

  function setterFunction(users){
    console.log(users)
    console.log(token)
  let user = users.find(u => u.email === localStorage.email)
  setUser(user)
 
  let p = user.projects.sort(function(a,b){
    return new Date(a.due_date) - new Date(b.due_date);
  });
  localStorage.user_id = user.id
  setProjects(p)
  let d = p[0].due_date
  console.log(dayjs(d).format('DD/MM/YYYY'))
  setMilestones(user.milestones)
  }
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  
  

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
    
    fetchUsers();               
  }, []);

    
  return (
    
    <div className='page'>
     
    <h1>{user.name}'s Projects</h1>   

    
    <br />

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
      <NavLink className="project-names" to={`/projects/${project.id}`} state={{user: {user}, project: {project}, milestones: {milestones}}}>  
      {project.name}   </NavLink>
      <br></br> 
      {project.kind}<br></br> Deadline | {dayjs(project.due_date).format("MM.DD.YYYY")}
     
      <button className='normal' onClick={() => {deleteProject(project.id)}}>delete</button>    </li>
      ))}
       
      <br />
      <br />
      <h1>Active Milestones</h1>
      <br></br>
      {milestones.map(milestone => 
      (<li key={milestone.id}>  <b>{milestone.name} </b>  <br></br> {milestone.description}<br></br> Due Date: {dayjs(milestone.due_date).format('DD.MM.YYYY')} <br /> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>delete</button>   </li>
      ))}       

        <br></br>
        <NavLink to="/logout">Logout</NavLink>
        </ul> 
    </div>
  )
        
}
        



export default HomePage