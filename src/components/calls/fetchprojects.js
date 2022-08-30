import React, { useEffect, useState } from "react"
import {NavLink} from 'react-router-dom';

const ProjectsFetch = () => {
  const [projects, setProjects] = useState([])

  const fetchData = () => {
    fetch("http://localhost:3000/projects")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProjects(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    
    <div>
      
      {projects.length > 0 && (
        <ul>
          
          {projects.map(project => (
            
            <li key={project.id}>  <NavLink to={`/projects/${project.id}`} > {project.name}  </NavLink><br></br> {project.kind}<br></br> Due Date:{project.due_date} </li>
          ))}
        </ul>
        
      )}
     
    </div>
  )
}

export default ProjectsFetch