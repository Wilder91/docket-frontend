

import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

import ProjectList from './user/projectList'
import ProjectForm from './project/ProjectForm'
import Templates from './templates/templates'
import TemplateForm from './templates/addTemplate'
import dayjs from 'dayjs'
import { Container, Modal, Navbar, Nav } from 'react-bootstrap';
import { FaFlag } from 'react-icons/fa';
import EditProject from './project/editProject';
import EditMilestone from './milestone/editMilestone'
import Urgent from './milestone/Urgent'


function HomePage({returningUser}) {
  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]);
  const [milestones, setMilestones] =useState([]);
  const [templates, setTemplates] = useState([]);
  const [project] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [templateFormOpen, setTemplateFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [milestone, setMilestone] = useState(false);
  const [editMilestoneFormOpen, setEditMilestoneFormOpen] = useState(false);
  const [urgentOpen, setUrgentOpen] = useState(false);
  const token = sessionStorage.token;
  const today = dayjs()
  const location = useLocation();

  

  /* retrieves index of all users, should really be a call for a specific user with user id */
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
  
  /* sets state for the homepage and ensures that projects and milestones are sorted correctly, first
  by date and then by completion status */
  function setterFunction(users){
      let user = users.find(u => u.email === sessionStorage.email)
      setUser(user)
      let p = user.projects.sort(function(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
      });
      let m = user.milestones.sort(function(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
      });

      let sorted = m.sort(function(a, b) {return a.complete - b.complete});
    
      sorted.map(m => m.project_name = (p.find(n => n.id === m.project_id).name))
      
 
      setTemplates(user.templates)
      sessionStorage.user_id = user.id
      setProjects(p)
      setMilestones(sorted)
  }

  function setterFunction2(user){    
    setUser(user)
    let p = user.projects.sort(function(a,b){
      return new Date(a.due_date) - new Date(b.due_date);
    });
    
    let m = user.milestones.sort(function(a,b){
      return new Date(a.due_date) - new Date(b.due_date);
    });

    let sorted = m.sort(function(a, b) {return a.complete - b.complete});

    sorted.map(m => m.project_name = (p.find(n => n.id === m.project_id).name))
    

    setTemplates(user.templates)
    sessionStorage.user_id = user.id
    setProjects(p)
    setMilestones(sorted)
  }

  
  /* alternates between showing or hiding the project form */
  const showModal = () => {
    setIsOpen((current) => !current);
  };



  /* alternates between showing or hiding the user's templates */
  const showTemplates = () => {
    setTemplatesOpen((current) => !current);
  }
 

  /* alternates between showing or hiding the user's urgent milestones*/
  const showUrgent = () => {
    setUrgentOpen((current) => !current)
  }

  const showTemplateForm = () => {
    setTemplateFormOpen((current) => !current)
  }



  /* alternates between showing or hiding a specific project's edit form */
  

  const showMilestoneEditForm = (id) => {
    const milestone = user.milestones.find(
      m => m.id === id
    );
    setMilestone(milestone)
    console.log(milestone)
    setEditMilestoneFormOpen(true);

  }
  
  const hideEditForm = () => {
    setEditFormOpen(false);
  }

  const hideEditMilestoneForm = () => {
    setEditMilestoneFormOpen(false);
  }
  
  /*
  function deleteProject(id) {
    let projectMilestones = milestones.filter(m => m.project_id === id)
    projectMilestones.map(m => deleteMilestone(m.id))
    fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' ,headers: new Headers( {
      Authorization: `${token}`,
      })} ) 
    removeProject(id)  
  }*/

  function deleteMilestone(id) {
    fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE', headers: new Headers( {
      Authorization: `${token}`,
      }) }) 
    removeMilestone(id)
  }


  
  /* removes a specific project from the DOM 
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
    
  }*/

  

  /* removes a specific milestone from the DOM */
  function removeMilestone(id) {      
    setMilestones(milestones.filter(p =>
        p.id !== id
      )
    )
  }

  /* changes a milestone's completion status */
  function handleMilestoneToggle(id) {
    const m = [...milestones]
    
    const milestone = m.find(
      m => m.id === id
    );
    
    milestone.complete = !milestone.complete
    
    
    m.sort(function(a,b){
      return new Date(a.due_date) - new Date(b.due_date);
    });

    let sorted = m.sort(function(a, b) {return a.complete - b.complete});
    
    setMilestones(sorted)


    
    fetch(`http://localhost:3000/milestones/${id}/complete`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: milestone.name,
      complete: milestone.complete
    }),
    headers: new Headers( {
      Authorization: `${sessionStorage.token}`, 
      'Content-Type': 'application/json'
    }),
  })
  }

  /* changes a milestone's completion status 
  function handleProjectToggle(id) {

    let new_arr = [...projects]
    let project = new_arr.find(
      p => p.id === id
    );
    
    setProjects(new_arr)
    
    const m = [...milestones]
    
    m.forEach((element) => {
      if(element.project_id === project.id) {
          element.complete = !element.complete;
      }
  });
    console.log(m)
    
    
    
    m.sort(function(a,b){
      return new Date(a.due_date) - new Date(b.due_date);
    });

    let sorted = m.sort(function(a, b) {return a.complete - b.complete});
    
    setMilestones(sorted)

   project.complete = !project.complete
    fetch(`http://localhost:3000/projects/${id}/complete`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: project.name,
      complete: project.complete,
      id: id
    }),
    headers: new Headers( {
      Authorization: `${localStorage.token}`, 
      'Content-Type': 'application/json'
    }),
  })
  }
  */
  
  useEffect(() => {
   
    
    fetchUsers();    
        
    
  }, []);

   
  return (
    
    <div className='page'>
   
     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">{user.name}</Navbar.Brand>
          <Nav className="container-fluid">
            <Nav.Link onClick={showTemplates}>Templates</Nav.Link>
            <Nav.Link onClick={showTemplateForm}>Add Template</Nav.Link>
            <Nav.Link onClick={showModal}>Add Project</Nav.Link>
            <Nav.Link onClick={showUrgent}>Urgent Milestones</Nav.Link>
            <Nav.Link className="ms-auto" href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  

      <Modal className='bootmodal' show={isOpen} onHide={showModal}>
        
        <Modal.Body><ProjectForm setProjects={setProjects} templates={templates} milestones = {milestones} setMilestones={setMilestones}/></Modal.Body>
        
      </Modal>
      <Modal className='bootmodal' show={templatesOpen} onHide={showTemplates}>
        
        <Modal.Body><Templates templates={templates} user={user} /></Modal.Body>
        
      </Modal>

      <Modal className='bootmodal' show={templateFormOpen} onHide={showTemplateForm}>
        
        <Modal.Body><TemplateForm templates={templates} user={user} /></Modal.Body>
        
      </Modal>

      <Modal className='bootmodal' show={editFormOpen} onHide={hideEditForm}>
        
        <Modal.Body><EditProject  templates={templates} user={user} project={project} /></Modal.Body>
        
      </Modal>

      <Modal className='bootmodal' show={editMilestoneFormOpen} onHide={hideEditMilestoneForm}>
        
        <Modal.Body><EditMilestone  templates={templates} user={user} milestone={milestone} /></Modal.Body>
        
      </Modal>

      <Modal className='bootmodal' show={urgentOpen} onHide={showUrgent}>
        
        <Modal.Body><Urgent milestones={milestones}  templates={templates} user={user} project={project} /></Modal.Body>
        
      </Modal>
   
    <ProjectList user={user} projects={projects} setProjects={setProjects} milestones={milestones} setMilestones={setMilestones} templates={templates}/>
  
  
      <br />
      <h1>Milestones</h1>
      

      <br></br>
      {milestones.length === 0 &&
  
  <h5>No milestones (yet)</h5> }
      {milestones.map(milestone => 
      (<li key={milestone.id} style={{opacity: milestone.complete === true && "20%"}}>{milestone.complete === true &&
       
      <h5>complete</h5> }  <FaFlag onClick={() => handleMilestoneToggle(milestone.id)} style={{color: milestone.complete ? "grey" : "red", opacity: "100"}}/> <b style={{color: milestone.complete === true && "red"}}> <br />{milestone.name} </b><br />
   
      {milestone.project_name} <br/>{milestone.description}<br></br><p >Due Date: {dayjs(milestone.due_date).format('MM.DD.YYYY')}  </p> 
      {milestone.complete === false &&  <p style={{color:dayjs(milestone.due_date).diff(today, 'day') <= 30 && "red"}}> {dayjs(milestone.due_date).diff(today, 'day')} days remaining </p>} 
      <button className='normal' onClick={() => {showMilestoneEditForm(milestone.id)}}>edit</button>   
      <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>delete</button>   </li>
      ))}       

        <br></br>
       
       
    </div>
  )
    
}
        



export default HomePage