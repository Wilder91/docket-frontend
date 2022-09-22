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
        alert('Milestone Deleted')
        fetch(`http://localhost:3000/projects/${projectId}/milestones/${id}`, { method: 'DELETE' })   
        
    }

   
  
    
    useEffect(() => {
        fetchMilestones({});
        console.log(milestones)
    }, []);

     return (
            <div>
      
            <h1>Active Milestones</h1>
        <ul>
            {milestones.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{milestone.due_date} <br></br> <button onClick={() => {deleteMilestone(milestone.id)}}>Delete</button> </li>
          ))}
          <br></br>
          <br></br>
          <NavLink to={`/projects/${projectId}/addMilestone`}>New Milestone</NavLink>
          <br></br>
          <br></br>
          <NavLink to="/projects">Return to Project List</NavLink>
          
        </ul>
        
      
     
    </div>
          );
      
}   


export default Project