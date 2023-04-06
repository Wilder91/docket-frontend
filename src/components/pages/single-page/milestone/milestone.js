import React from 'react';
import { Card } from 'react-bootstrap';
import { FaFlag } from 'react-icons/fa';
import dayjs from 'dayjs';

function Milestone({ milestone, handleMilestoneToggle, showMilestoneEditForm, deleteMilestone, today }) {
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
        <p >Due Date: {milestone.due_date}  </p> 
        {console.log(milestone)}
        {milestone.complete === false &&  
          <p style={{color:dayjs(milestone.due_date).diff(today, 'day') <= 30 && "red"}}>
            {dayjs(milestone.due_date).diff(today, 'day')} days remaining 
          </p>} 
        <button className='normal' onClick={() => showMilestoneEditForm(milestone.id)}>edit</button>   
        <button className='normal' onClick={() => deleteMilestone(milestone.id)}>delete</button>   
      </Card>
    </li>
  );
}

export default Milestone