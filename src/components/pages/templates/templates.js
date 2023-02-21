import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card'
function templateIndex() {
    const location = useLocation();
    const templates = location.state.templates
    
    function deleteTemplate(id) {
        fetch(`http://localhost:3000/templates/${id}`, { method: 'DELETE', headers: new Headers( {
      Authorization: `${localStorage.token}`, })})  
      
   }


    return(
        <div>
            <Card style={{background: 'none', border: 'none', display: 'inline'}}>
            
        {templates.map((template) =>(<li key={template.id}> 
           <h1 className="project-names">{template.name}</h1>
           
            {template.milestones.map((milestone) =>(<Card className="card-body" key={milestone.id}>{milestone.name} {milestone.lead_time} Days Before Due Date <br />    </Card> ))} <button className='normal' onClick={() => {deleteTemplate(template.id)}}>Delete</button>   </li>))}
      
           <br />
           </Card> 
           <NavLink to="/home" >Home</NavLink> 
 </div>
     
    ) 

}

export default templateIndex

