import React, { useEffect, useState } from "react"
import {NavLink} from 'react-router-dom';

const MilestonesFetch = () => {
  const [milestones, setMilestones] = useState([])

  const fetchData = () => {
    fetch("http://localhost:3000/milestones")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setMilestones(data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    
    <div>
      
      {milestones.length > 0 && (
        <ul>
          {milestones.map(project => (
            
            <li key={project.id}>{project.name} {project.kind} {project.due_date} </li>
          ))}
        </ul>
        
      )}
      <NavLink to="/projects"> hello </NavLink>
    </div>
  )
}

export default MilestonesFetch