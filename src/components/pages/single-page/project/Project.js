import React, {  useState, useEffect} from 'react';
import { NavLink, useParams, useLocation} from 'react-router-dom';
import MilestoneForm from '../milestone/MilestoneForm';
import EditProject from './editProject'
import Modal from 'react-bootstrap/Modal';
import dayjs from 'dayjs';
import Card from 'react-bootstrap/Card';

function Project() {
  const [milestones, setMilestones] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
    
  const location = useLocation()
  const {projectId} = useParams();
 
  function deleteMilestone(id) {
    fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE', headers: new Headers( {
      Authorization: `${localStorage.token}`, })})  
    removeMilestone(id)      
   }

   function removeMilestone(id) {  
    setMilestones(milestones.filter(p =>
        p.id !== id
      )
    )
  }

  function hello() {
  setMilestones( location.state.milestones.milestones.filter((m) =>
    m.project_id.toString() === projectId
  ))
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


  


  useEffect(() => {  
    hello()   
  
  }, []);
 

  return (    
  <div className='page'>
    
  <h1>{location.state.project.project.name} Milestones</h1>
    <br />
    <button className="normal" onClick={showModal}>Add Milestone</button>
      <Modal className='bootmodal' show={isOpen} onHide={hideModal}>
       
        <Modal.Body><MilestoneForm setMilestones={setMilestones} project={location.state.project.project}/></Modal.Body>
    
      </Modal>
     

      <button className='normal' onClick={showEdit}>edit {location.state.project.project.name} details</button>
      <Modal className='bootmodal' show={editOpen} onHide={hideEdit}>
       
        <Modal.Body> <EditProject project={location.state.project.project}templates = {location.state.user.user.templates}/> </Modal.Body>
  
      </Modal>
<br />


  <ul>
  {milestones.length === 0 &&
  
  <h5>No milestones</h5> }
   <Card style={{background: 'none', border: 'none', display: 'inline'}}>
  {milestones.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{dayjs(milestone.due_date).format('MM.DD.YYYY')} <br></br> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>Delete</button> </li>
  ))}
  </Card>
  <br></br>
  <br></br>
  <NavLink to="/home" >Home</NavLink> 
  </ul>
  </div>
  );
}   


export default Project




