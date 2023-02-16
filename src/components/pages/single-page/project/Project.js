import React, {  useState, useEffect} from 'react';
import { NavLink, useParams, useLocation} from 'react-router-dom';
import MilestoneForm from '../milestone/MilestoneForm';
import EditProject from './editProject'
import Modal from 'react-modal';
import dayjs from 'dayjs';
import Card from 'react-bootstrap/Card';
function Project() {
  const [milestones, setMilestones] = useState([])
  const [formOpen, setFormOpen] = useState()     
  const location = useLocation()
  const {projectId} = useParams();
  const [editIsOpen, setEditIsOpen] = useState(false);
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

  function openForm() {
    console.log(formOpen);
    setFormOpen(true);
    console.log(formOpen);
  }


  function closeForm() {
    setFormOpen(false);
  }

  function openEdit() {
    setEditIsOpen(true);
    
  }

  function closeEdit() {
    setEditIsOpen(false);
  }


  useEffect(() => {  
    hello()   

  }, []);
 

  return (    
  <div className='page'>
  <h1>{location.state.project.project.name} Milestones</h1>
    <br />
  <button className='normal' onClick={openForm}>Add Milestone</button>
      <Modal style={{opacity: 1}}
        className='modal'
        isOpen={formOpen}

        onRequestClose={closeForm}

        contentLabel="Example Modal"
        ariaHideApp={false}
      >
       <MilestoneForm setMilestones={setMilestones} />
      </Modal>

      <button className='normal' onClick={openEdit}>edit {location.state.project.project.name} details</button>
      <Modal
        isOpen={editIsOpen}
        ariaHideApp={false}
        onRequestClose={closeEdit}
        className="modal"
        contentLabel="Example Modal"
      >
      <EditProject project={location.state.project.project} /> 
      </Modal>
<br />


  <ul>
  {milestones.length === 0 &&
  
  <h5>No milestones</h5> }
   <Card style={{background: 'none', border: 'none', display: 'inline'}}>
  {milestones.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{dayjs(milestone.due_date).format('DD.MM.YYYY')} <br></br> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>Delete</button> </li>
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




