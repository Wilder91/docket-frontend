import React, {useEffect}  from 'react';
import { Card } from 'react-bootstrap';
import { FaFlag } from 'react-icons/fa';
import dayjs from 'dayjs';
const token = sessionStorage.token;



function Milestone({ milestone, setMilestone, milestones, setMilestones, showMilestoneEditForm, today }) {

  const confirmDeleteMilestone = (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      deleteMilestone(id);
    }
  };
  function deleteMilestone(id) {
 
    fetch(`http://localhost:3000/milestones/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Milestone deleted successfully:', response);
          removeMilestone(id);
        } else {
          throw new Error('Failed to delete milestone');
        }
      })
      .catch((error) => {
        console.error('Error deleting milestone:', error);
      });
  }

  


  

  /* removes a specific milestone from the DOM */
  function removeMilestone(id) {      
    setMilestones(milestones.filter(p =>
        p.id !== id
      )
    )
  }


  
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
    
  }, []);
  return (
    <li key={milestone.id} style={{opacity: milestone.complete === true && "20%"}}> 
      <Card className='bootstrap-card-no-hover'>
        {milestone.complete === true &&
          <h5>complete</h5>}
        <FaFlag onClick={() => handleMilestoneToggle(milestone.id)} style={{color: milestone.complete ? "grey" : "red", opacity: "100"}}/> 
        <b style={{color: milestone.complete === true && "red"}}> 
          <br />{milestone.name} 
        </b>
        <br />
        {milestone.project_name} 
        <br/>
        {milestone.description}
        <br></br>
        <p >Due Date: {dayjs(milestone.due_date).format('MM.DD.YYYY')}  </p> 
        
        {milestone.complete === false &&  
         <p style={{color: dayjs(milestone.due_date).diff(today, 'day') <= 0 ? "red" : "inherit"}}>
         {dayjs(milestone.due_date).diff(today, 'day') <= 0 ? `${dayjs(milestone.due_date).diff(today, 'day') * -1} days Overdue` :
           `${dayjs(milestone.due_date).diff(today, 'day')} days remaining`}
       </p> }
        <button className='normal' onClick={() => showMilestoneEditForm(milestone.id)}>edit</button>   
        <button className='normal' onClick={() => confirmDeleteMilestone(milestone.id)}>delete</button>   
      </Card>
    </li>
  );
}

export default Milestone