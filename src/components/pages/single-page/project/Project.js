import React, {  useContext, useState, useEffect} from 'react';
import { useParams, useLocation, useNavigate} from 'react-router-dom';
import MilestoneForm from '../milestone/MilestoneForm';
import EditProject from './editProject'
import {Modal, Card, Navbar, Nav, Container } from 'react-bootstrap';
import dayjs from 'dayjs';
import {UserContext} from '../util/context'


function Project() {
  const [milestones, setMilestones] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  
  const location = useLocation()
  const user = location.state.user.user
  const project = location.state.project.project
  const projectId = useParams();
  const mike = useContext(UserContext);
  const nav = useNavigate()
  const projectMilestones =  user.milestones.filter((m) =>
  m.project_id === project.id
)

  function deleteMilestone(id) {
    fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE', headers: new Headers( {
      Authorization: `${sessionStorage.token}`, })})  
    removeMilestone(id)  
    console.log(sessionStorage)    
   }

   function removeMilestone(id) {  
    setMilestones(milestones.filter(p =>
        p.id !== id
      )
    )
  }

  function hello() {
    console.log(projectId)
    console.log(user.milestones)
    console.log(window.location)
   console.log(mike)

  }
 /* ok */
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showEdit = () => {
    setEditOpen(true);
  };

  const hideEdit = () => {
    setEditOpen(false);
  };
  
  /*ok*/

  function goHome() {
    console.log(user)
    nav("/home",
    {state: {returningUser: {user}}})
  }  


  useEffect(() => {  
    console.log(user)  
    hello()
  }, []);


  return (  
    
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">{user.name}</Navbar.Brand>
          <Nav className="container-fluid">
            <Nav.Link onClick={goHome}>Home</Nav.Link>
            <Nav.Link onClick={showEdit}>Edit Project </Nav.Link>
            <Nav.Link onClick={showModal}>Add Milestone</Nav.Link>
            
            <Nav.Link className="ms-auto" href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
    <h1>{project.name} Milestones</h1>
    <br />
  
      <Modal className='bootmodal' show={isOpen} onHide={hideModal}>
       
        <Modal.Body><MilestoneForm setMilestones={setMilestones} project={location.state.project.project}/></Modal.Body>
    
      </Modal>
     

     
      <Modal className='bootmodal' show={editOpen} onHide={hideEdit}>
       
        <Modal.Body> <EditProject project={location.state.project.project}templates = {location.state.user.user.templates}/> </Modal.Body>
  
      </Modal>
    <ul>
    {user.milestones.length === 0 &&
    
    <h5>No milestones</h5> }
     <Card style={{background: 'none', border: 'none', display: 'inline'}}>
    {projectMilestones.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{dayjs(milestone.due_date).format('MM.DD.YYYY')} <br></br> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>Delete</button> </li>
    ))}
    </Card>
 
    </ul>  
</div>
    
  )
}   


export default Project




