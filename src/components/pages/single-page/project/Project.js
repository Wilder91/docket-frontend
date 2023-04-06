import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import MilestoneForm from '../milestone/MilestoneForm';
import EditProject from './editProject'
import {Modal, Card, Navbar, Nav, Container } from 'react-bootstrap';
import dayjs from 'dayjs';



function Project() {
  const [user, setUser] = useState('')
  const [milestones, setMilestones] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  
  const [project, setProject] = useState('')
  const location = useLocation()


  const nav = useNavigate()
  

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
    console.log(user)
    console.log(milestones)
    


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
    setUser(location.state.user) 
    setProject(location.state.project)
    setMilestones(location.state.user.milestones.filter((m) =>
    m.project_id === location.state.project.id))
    console.log(location.state)
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
    <ul>
    {milestones.length === 0 &&
    
    <h5>No milestones</h5> }
    
    {milestones.map(milestone => (<li key={milestone.id}>  <Card className='bootstrap-card-no-hover' > <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{dayjs(milestone.due_date).format('MM.DD.YYYY')} <br></br> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>Delete</button></Card>  </li>
    ))}
    
 
    </ul> 
  
     

     
      <Modal className='bootmodal' show={editOpen} onHide={hideEdit}>
       
        <Modal.Body> <EditProject project={location.state.project.project}templates = {location.state.user.templates}/> </Modal.Body>
  
      </Modal>
   
</div>
    
  )
}   


export default Project




