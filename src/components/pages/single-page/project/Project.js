import React, {  useState, useEffect} from 'react'
import { NavLink, useParams, useLocation} from 'react-router-dom';
import MilestoneForm from '../milestone/MilestoneForm'
function Project() {
    const [milestones, setMilestones] = useState([])
    const [user, setUser] = useState([])
    const [projects, setProjects] = useState([])
    const [showForm, setShowForm] = useState()
    const [filtered, setFiltered] = useState([])
    const location = useLocation()
   
    
    const {projectId} = useParams();

   
    
   
    

    function deleteMilestone(id) {
        fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE' })   
        removeMilestone(id)      
    }

    function removeMilestone(id) {      
       
    }

    function hello() {
      console.log(location.state.milestones.milestones)
      setFiltered(location.state.milestones.milestones)
      setUser(location.state.user.user)
      setProjects(location.state.projects.projects)
      
      console.log(typeof location.state.milestones.milestones[0].project_id)
      console.log(typeof projectId)
     let num = projectId
     setFiltered( location.state.milestones.milestones.filter((m) =>
        m.project_id.toString() === num
      ))
     
      console.log(filtered)
    }

    /*function selectProject() {
      location.state.projects.filter(a =>
        a.id === projectId
      ) */
   
      useEffect(() => {
     
        hello()
       
    }, []);
 

     return (    
        <div className='page'>
        <h1>Active Milestones </h1>
      
        <h4 onClick = {() => setShowForm(true)} className = 'page'>Add Milestone</h4> 
        { showForm    
        ? <div className = 'Menu'>  
        <div onClick = {() => setShowForm(false)} className = 'Invisible'></div>
    
          <MilestoneForm setMilestones={setMilestones} milestones ={milestones} setProjects={setProjects} projects={projects} setUser={setUser} user={user}/>
    </div>
    : null
    }
        <ul>
        {filtered.length <= 0 &&
        
        <h1>This Project Has No Milestones</h1> }
        {filtered.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{milestone.due_date} <br></br> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>Delete</button> </li>
        ))}
        
        <br></br>
        <br></br>
        <NavLink to="/home" >Return to Project List</NavLink> 
        </ul>
        </div>
        );
}   


export default Project




/*[{id: 2, name: 'present proofs', description: 'give customer time to review and suggest changes', due_date: '2022-04-06', project_id: 1}, {id: 1, name: 'ship invites', description: 'invites must be shipped by this date', due_date: '2022-04-09', project_id: 2}]
[{id: 2, name: 'present proofs', description: 'give customer time to review and suggest changes', due_date: '2022-04-06', project_id: 1}, {id: 1, name: 'ship invites', description: 'invites must be shipped by this date', due_date: '2022-04-09', project_id: 2}]
*/
