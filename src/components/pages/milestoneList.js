

import React from 'react'
import { Link, useParams} from 'react-router-dom';

const mainContainer = document.querySelector("body")
function displayProjects(project) {
    let card = document.createElement("project-card")

    card.innerHTML += 
      `
      <div class="project-card" id="${project.milestones[0].id}">
      <div class="innertext">
      <p>Click to View milestone's Milestones</p> 
      <h1> ${project.milestones[0].name} <h1> 
      <br></br>
      <h2> ${project.milestones[0].description} </h2>
      <h3> ${project.milestones[0].due_date}</h3>
      <button onclick="deleteMilestone(${project.milestones[0].id})"> Delete</button>
      <br></br>
      </div>
      `
      mainContainer.appendChild(card)
        
    
  }
const milestoneList = () => {
    const { projectId } = useParams();
    fetch(`http://localhost:3000/projects/${projectId}`)
    .then((response) => response.json())
    .then((data) => (displayProjects(data)));

  
   
    return (
        <section className='section project'>
           
            <div>{projectId}</div>
            <Link to='/projects'> back to Projects </Link>
          
         
            </section>
    )
   
}

export default milestoneList