import React, { useEffect, useState} from 'react'
import { NavLink, useParams} from 'react-router-dom';


 
function Project() {
    const [milestones, setMilestones] = useState([])
    const {projectId} = useParams();
  
    const fetchMilestones = () => {
        fetch(`http://localhost:3000/projects/${projectId}/milestones`)
        .then(result => result.json())
        .then(data =>setMilestones(data))
    }

    function deleteMilestone(id) {
       
        fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE' })   
        removeMilestone(id)
        
    }

    function removeMilestone(id) {
      
        setMilestones(milestones.filter(a =>
            a.id !== id
          )
        )
    }
    
  
    
    useEffect(() => {
        fetchMilestones({});
        console.log(milestones)
    }, []);

     return (
            <div>
         

            <div id= "milestone-list">
            <h1>Active Milestones</h1>
            <ul>
            {milestones.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{milestone.due_date} <br></br> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>Delete</button> </li>
          ))}
          <br></br>
          <br></br>
          <NavLink to={`/projects/${projectId}/addMilestone`}>New Milestone</NavLink>
          <br></br>
          <br></br>
          <NavLink to="/user">Return to Project List</NavLink>
          
        </ul>
        </div>
      
        
      
     
    </div>
          );
      
}   


export default Project