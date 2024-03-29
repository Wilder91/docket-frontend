import React, { useEffect, useState} from 'react'
import ProjectList from '../single-page/project/projectList'
import ProjectForm from './project/ProjectForm'
import Templates from './templates/templateList'
import TemplateForm from './templates/addTemplate'
import {  Container, Modal, Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditProject from './project/editProject';
import EditMilestone from './milestone/editMilestone';
import MilestoneList from './milestone/milestoneList';
import UserCalendar from './user/calendar'

import UserProfile from './user/profile'
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  const [user, setUser] = useState({});
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const token = sessionStorage.token;
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
    
    if (!currentUser) {
      // Handle the case where the current user is not found
      console.error("Current user not found");
      return;
    }
  
    setUser(prevUser => ({ ...prevUser, ...currentUser }));
  
    const { id, projects, milestones, templates } = currentUser;
  
    if (!id || !projects || !milestones || !templates) {
      // Handle the case where some required data is missing
      console.error("Missing required data for user");
      return;
    }
  
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

  

  function onConfirmDelete() {
   
    alert("Your account has been deleted successfully.");
    sessionStorage.clear();
    navigate('/login'); // Now it's valid to use navigate here
  }

  
  /* alternates between showing or hiding the project form */
  const showModal = () => {
    setIsOpen((current) => !current);
  };

  const showCalendar = () => {
    setCalendarOpen((current) => !current);
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
  

  const showMilestoneEditForm = (selectedMilestone) => {
    
    setMilestone(selectedMilestone)
    
    setEditMilestoneFormOpen(true);

  }
  
  const hideEditForm = () => {
    setEditFormOpen(false);
  }

  const hideEditMilestoneForm = () => {
    setEditMilestoneFormOpen(false);
  }

  
  const showUserProfile = () => {
    console.log('showUserProfile function called');
    setUserProfileOpen(true);
  };

  const hideUserProfile= () => {
    setUserProfileOpen(false);
    console.log(userProfileOpen)
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
      
      
      <Navbar  className='Navbar d-none d-lg-block' id='navbar'>
            <Container id='nav-container'>
              <img src='/2.png' className='NavBarLogo' alt='docket logo'></img>
              <Navbar.Brand >Docket</Navbar.Brand>
              <Nav >
                <Nav.Link onClick={showTemplates} >Templates</Nav.Link>
                <Nav.Link onClick={showTemplateForm} >Add Template</Nav.Link>
                <Nav.Link onClick={showModal} >Add Project</Nav.Link>
                <Nav.Link onClick={showCalendar} >Calendar</Nav.Link>
                <Nav.Link onClick={showUserProfile} user={user} > Account </Nav.Link>
                
                </Nav>
                </Container>
                <p  className='logout-group'>Hello, {user.name} | <a href="/logout" className='logout-button'>Logout</a></p>
        
            
          </Navbar>

           {/* Navbar for smaller screens (less than 800px) */}
      <Navbar  className='Navbar d-lg-none' id='small-navbar'>
        {/* Adjust the content for the smaller Navbar here */}
        <img src='/2.png' className='NavBarLogo' alt='docket logo'></img>
        <Navbar.Brand>Docket</Navbar.Brand>
        {/* Add a dropdown button for additional actions */}
        <DropdownButton id="dropdown-basic-button" title="Menu">
          {/* Add dropdown items with respective actions */}
          <Dropdown.Item onClick={showTemplates}>Templates</Dropdown.Item>
          <Dropdown.Item onClick={showTemplateForm}>Add Template</Dropdown.Item>
          <Dropdown.Item onClick={showModal}>Add Project</Dropdown.Item>
          <Dropdown.Item onClick={showCalendar}>Calendar</Dropdown.Item>
          <Dropdown.Item onClick={showUserProfile}>Account</Dropdown.Item>
          <Dropdown.Item href="/logout">Logout</Dropdown.Item>
          {/* Include actions accordingly */}
        </DropdownButton>
      </Navbar>

       
  
          <Modal className='bootmodal' show={isOpen} onHide={showModal}>
            <Modal.Body><ProjectForm user={user} setUser={setUser} setProjects={setProjects} templates={templates} milestones={milestones} setMilestones={setMilestones} /></Modal.Body>
          </Modal>
  
          <Modal className='bootmodal' show={templatesOpen} onHide={showTemplates}>
            <Modal.Body><Templates templates={templates} setTemplates={setTemplates} user={user} /></Modal.Body>
          </Modal>
  
          <Modal className='bootmodal' show={templateFormOpen} onHide={showTemplateForm}>
            <Modal.Body><TemplateForm templates={templates} setTemplates={setTemplates} user={user} setTemplateFormOpen={setTemplateFormOpen} /></Modal.Body>
          </Modal>
  
          <Modal className='bootmodal' id="edit-project" show={editFormOpen} onHide={hideEditForm}>
            <Modal.Body>
              <EditProject
                user={user}
                setUser={setUser}
                project={project}
                projects={projects}
                setProjects={setProjects}
                setMilestones={setMilestones}
                initialUser={user}
              />
            </Modal.Body>
          </Modal>
  
          <Modal className='bootmodal' show={editMilestoneFormOpen} onHide={hideEditMilestoneForm}>
            <Modal.Body>
              <EditMilestone user={user} setUser={setUser} templates={templates} milestone={milestone} setMilestone={setMilestone} milestones={milestones} setMilestones={setMilestones} />
            </Modal.Body>
          </Modal>

          

          <Modal className='bootmodal' show={userProfileOpen} onHide={hideUserProfile}>
            <Modal.Body>
              <UserProfile user={user} setUser={setUser} setEditFormOpen={setEditFormOpen} onConfirmDelete={onConfirmDelete}/>
            </Modal.Body>
          </Modal>

          <Modal className='calendar-bootmodal' show={calendarOpen} onHide={showCalendar}>
      
            <UserCalendar milestones={milestones}/>
         
          </Modal>
  
          <br />
          <div className='project-list'>
          <p id='projects-headline'>Projects</p>
          <ProjectList user={user} setUser={setUser} projects={projects} setProjects={setProjects} milestones={milestones} setMilestones={setMilestones} templates={templates} />
          </div>
      
      
  
   
     
      <MilestoneList user={user} setUser={setUser} milestones={milestones} setMilestone={setMilestone} setMilestones={setMilestones} projects={projects} setProjects={setProjects} templates={templates} setTemplates={setTemplates} showMilestoneEditForm={showMilestoneEditForm} handleMilestoneToggle={handleMilestoneToggle} />
        <br />
        <br />
        <div>
      
      </div>
    </div>
  );
  
}
        



export default HomePage