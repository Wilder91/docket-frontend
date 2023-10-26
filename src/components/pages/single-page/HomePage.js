import React, { useEffect, useState} from 'react'
import ProjectList from '../single-page/project/projectList'
import ProjectForm from './project/ProjectForm'
import Templates from './templates/templates'
import TemplateForm from './templates/addTemplate'
import {  Container, Modal, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditProject from './project/editProject';
import EditMilestone from './milestone/editMilestone';
import MilestoneList from './milestone/milestoneList';
import DeleteUser from './user/deleteUser'
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
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
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
  useEffect(() => {
  console.log(user);
}, [user]);
  /* sets state for the homepage and ensures that projects and milestones are sorted correctly, first
  by date and then by completion status */
  const setterFunction = (users) => {
    console.log(users)
    const currentUser = users.find((user) => user.email === sessionStorage.email);
    setUser(prevUser => ({ ...prevUser, ...currentUser }));
    console.log(user)
  
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

  

  function onConfirmDelete() {
    console.log('yup');
    alert("Your account has been deleted successfully.");
    sessionStorage.clear();
    navigate('/login'); // Now it's valid to use navigate here
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

  const showDeleteUserModal = () => {
    setDeleteUserOpen(true);
  };
  
  const hideDeleteUserModal = () => {
    setDeleteUserOpen(false);
  };
  


  

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
          <Navbar bg="dark\" variant="dark" className='Navbar'>
            <Container>
              <img src='/2.png' className='NavBarLogo' alt='docket logo'></img>
              <Navbar.Brand >Docket</Navbar.Brand>
              <Nav className="container-fluid">
                <Nav.Link onClick={showTemplates} className='nav-link'>Templates</Nav.Link>
                <Nav.Link onClick={showTemplateForm} className='nav-link'>Add Template</Nav.Link>
                <Nav.Link onClick={showModal} className='nav-link'>Add Project</Nav.Link>
                <Nav.Link onClick={showDeleteUserModal} className='nav-link'>Delete User</Nav.Link>
                <Navbar.Brand className='ms-auto'>Hello, {user.name} | <a href="/logout" className='logout-button'>Logout</a></Navbar.Brand>
              </Nav>
            </Container>
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

          <Modal className='bootmodal' show={deleteUserOpen} onHide={hideDeleteUserModal}>
            <Modal.Body>
              <DeleteUser user={user} onConfirmDelete={onConfirmDelete}/>
            </Modal.Body>
          </Modal>
  
          <br />
          <div className='project-list'>
          <p className='headline'>Projects</p>
          <ProjectList user={user} setUser={setUser} projects={projects} setProjects={setProjects} milestones={milestones} setMilestones={setMilestones} templates={templates} />
          </div>
        </>
      )}
  
      <br />
      <p className='headline'>Milestones</p>
      <MilestoneList user={user} setUser={setUser} milestones={milestones} setMilestones={setMilestones} projects={projects} setProjects={setProjects} templates={templates} setTemplates={setTemplates} showMilestoneEditForm={showMilestoneEditForm} handleMilestoneToggle={handleMilestoneToggle} />
    </div>
  );
  
}
        



export default HomePage