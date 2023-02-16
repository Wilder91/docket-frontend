import React, {useEffect} from "react";
import { useLocation, NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card'
function templateIndex() {
    const location = useLocation();
    const templates = location.state.templates
    

    useEffect(() => {
    
            console.log(templates)       
      }, []);
    

    return(
        <div>
            <Card style={{background: 'none', border: 'none', display: 'inline'}}>
            </Card> 
        {templates.map((template) =>(<li key={template.id}> 
           <h1 className="project-names">{template.name}</h1>
           
            {template.milestones.map((milestone) =>(<Card className="card-body">{milestone.name}      </Card> ))}  </li>))}
      
           <br />
           <NavLink to="/home" >Home</NavLink> 
 </div>
     
    ) 

}

export default templateIndex

