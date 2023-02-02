import React, {  useState, useEffect} from 'react';
import { NavLink, useParams, useLocation} from 'react-router-dom';
import MilestoneForm from '../milestone/MilestoneForm';
import EditProject from './editProject'
import Modal from 'react-modal';
import dayjs from 'dayjs';
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
    setFormOpen(true);
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
    console.log(location.state)
  }, []);
 

  return (    
  <div className='page'>
  <h1>{location.state.project.project.name} Milestones</h1>
    <br />
  <button className='normal' onClick={openForm}>Add Milestone</button>
      <Modal
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
  
  <h5>Nothing Here, Yet!</h5> }
  {milestones.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{dayjs(milestone.due_date).format('DD.MM.YYYY')} <br></br> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>Delete</button> </li>
  ))}
  
  <br></br>
  <br></br>
  <NavLink to="/home" >Home</NavLink> 
  </ul>
  </div>
  );
}   


export default Project




/*[{id: 2, name: 'present proofs', description: 'give customer time to review and suggest changes', due_date: '2022-04-06', project_id: 1}, {id: 1, name: 'ship invites', description: 'invites must be shipped by this date', due_date: '2022-04-09', project_id: 2}]
[{id: 2, name: 'present proofs', description: 'give customer time to review and suggest changes', due_date: '2022-04-06', project_id: 1}, {id: 1, name: 'ship invites', description: 'invites must be shipped by this date', due_date: '2022-04-09', project_id: 2}]
*/
