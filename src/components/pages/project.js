import React, { useEffect, useState} from 'react'
import { NavLink, useParams} from 'react-router-dom';


 
function Project() {
    const [project, setProject] = useState([])
    const {projectId} = useParams();
  
    const fetchProject = () => {
        fetch(`http://localhost:3000/projects/${projectId}/milestones`)
        .then(result => result.json())
        .then(data =>setProject(data))
    }

  
    
    useEffect(() => {
        fetchProject({});
    }, []);
    console.log(project)
     return (
            <div>
      
            <h1>{`${project.name}`} Milestones</h1>
        <ul>
            {project.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{milestone.due_date}  </li>
          ))}
          <br></br>
          <NavLink to={`/projects/${projectId}/addMilestone`}>New Milestone</NavLink>
          <br></br>
          <NavLink to="/projects">Return to Project List</NavLink>
        </ul>
        
      
     
    </div>
          );
      
}   


export default Project