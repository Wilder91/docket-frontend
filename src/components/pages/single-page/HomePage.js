import React, { useEffect, useState} from 'react'
import ProjectList from '../single-page/project/projectList'
import ProjectForm from './project/ProjectForm'
import Templates from './templates/templates'
import TemplateForm from './templates/addTemplate'
import dayjs from 'dayjs'
import {  Container, Modal, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditProject from './project/editProject';
import EditMilestone from './milestone/editMilestone';
import Milestone from './milestone/milestone'

function HomePage() {
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

  const token = sessionStorage.token;
  const today = dayjs();
  const navigate = useNavigate();

  

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
  const setterFunction = (users) => {
    const currentUser = users.find((user) => user.email === sessionStorage.email);
    setUser(currentUser);
    
    const { id, projects, milestones, templates } = currentUser;
    
    const sortedProjects = [...projects].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    const sortedMilestones = [...milestones].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
  
    sortedMilestones.forEach((milestone) => {
      const project = sortedProjects.find((project) => project.id === milestone.project_id);
      milestone.project_name = project ? project.name : '';
    });
  
    sortedMilestones.sort((a, b) => a.complete - b.complete);
  
    sessionStorage.user_id = id;
  
    setTemplates(templates);
    setProjects(sortedProjects);
    setMilestones(sortedMilestones);
  };

  

  

  
  /* alternates between showing or hiding the project form */
  const showModal = () => {
    setIsOpen((current) => !current);
  };



  /* alternates between showing or hiding the user's templates */
  const showTemplates = () => {
    setTemplatesOpen((current) => !current);
  }
 

  /* alternates between showing or hiding the user's urgent milestones*/
 

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

 
  
  useEffect(() => { 
    if(!sessionStorage.token) {
      navigate('/login')
    } 
    else{
      fetchUsers();
    }    
  }, []);

   
  return (
    <div className='page'>
    {user.length === 0 ? (
      <h5> </h5>
    ) : (
      <>
      {
    
    <div className='page'>
   
     <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >{user.name}</Navbar.Brand>
          <Nav className="container-fluid">
            <Nav.Link onClick={showTemplates}>Templates</Nav.Link>
            <Nav.Link onClick={showTemplateForm}>Add Template</Nav.Link>
            <Nav.Link onClick={showModal}>Add Project</Nav.Link>
            <Nav.Link className="ms-auto" href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  

      <Modal className='bootmodal' show={isOpen} onHide={showModal}>
        
        <Modal.Body><ProjectForm setProjects={setProjects} templates={templates} milestones = {milestones} setMilestones={setMilestones}/></Modal.Body>
        
      </Modal>
      <Modal className='bootmodal' show={templatesOpen} onHide={showTemplates}>
        
        <Modal.Body><Templates templates={templates} setTemplates={setTemplates} user={user} /></Modal.Body>
        
      </Modal>

      <Modal className='bootmodal' show={templateFormOpen} onHide={showTemplateForm}>
        
        <Modal.Body><TemplateForm templates={templates} setTemplates={setTemplates} user={user} setTemplateFormOpen={setTemplateFormOpen} /></Modal.Body>
        
      </Modal>

      <Modal className='bootmodal' show={editFormOpen} onHide={hideEditForm}>
        
        <Modal.Body><EditProject project={project} projects={projects} setProjects={setProjects} /></Modal.Body>
        
      </Modal>

      <Modal className='bootmodal' show={editMilestoneFormOpen} onHide={hideEditMilestoneForm}>
        
        <Modal.Body><EditMilestone  templates={templates} user={user} milestone={milestone} setMilestone={setMilestone} milestones={milestones} setMilestones={setMilestones} /></Modal.Body>
        
      </Modal>

    
   
    <ProjectList user={user} projects={projects} setProjects={setProjects} milestones={milestones} setMilestones={setMilestones} templates={templates}/>
  
  
      <br />
      <div>
      <h1>Milestones</h1>
      

      <br></br>
      {milestones.length === 0 &&
  <h5>No milestones (yet)</h5> }
{milestones.map(milestone => (
  <Milestone 
     
    milestone={milestone} 
    setMilestone={setMilestone}
    handleMilestoneToggle={handleMilestoneToggle} 
    showMilestoneEditForm={showMilestoneEditForm} 
    milestones={milestones}
    setMilestones={setMilestones}
    today={today} 
  />
))}
       
    </div></div>
  
}

</>
    )}
  </div>
  
  );
  
}
        



export default HomePage