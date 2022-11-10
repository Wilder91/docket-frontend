import React, { useEffect, useState} from 'react'
import { NavLink} from 'react-router-dom';


function User() {
  const [projects, setProjects] = useState([])
    
    
   

    const fetchUsers = () => {
        fetch(`http://localhost:3000/users/`)
        .then(result => result.json())
        .then(users => findUser(users)) 
    }

    const fetchProjects = () => {
      fetch(`http://localhost:3000/users/${localStorage.user_id}/projects`)
      .then(result => result.json())
      .then(projects => setProjects(projects))
  
    }

    function deleteProject(id) {

      fetch(`http://localhost:3000/projects/${id}`, { method: 'DELETE' }) 
      removeProject(id)  
    }

    function removeProject(id) {
      
      setProjects(projects.filter(p =>
          p.id !== id
        )
      )
  }

    
    useEffect(() => {
        fetchUsers({});
        
    }, []);



    function findUser(users) {
        
        console.log(users)
        users.forEach(user=> {
            if (localStorage.email === user.email) {  
              localStorage.user_id = user.id
            fetchProjects() 
            }
          })
        }
    

  
  

        return (
    
    <div>
      
            <h1>Active Projects</h1>
     <ul>
          {projects.map(project => (<li key={project.id}>  <NavLink to={`/projects/${project.id}`} > {project.name}  </NavLink><br></br> {project.kind}<br></br> Due Date:{project.due_date} <button onClick={() => {deleteProject(project.id)}}>Delete</button>   </li>
          ))}
          <br></br>
          <br></br>
          <NavLink to='/addproject'>Add a New Project</NavLink> &nbsp; <NavLink to="/logout">Logout</NavLink>
        </ul>
        
      
     
    </div>
  )
        
}
        



export default User