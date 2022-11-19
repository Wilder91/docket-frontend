import React, { useEffect, useState} from 'react'
import { NavLink, useParams} from 'react-router-dom';


function User() {
  const [projects, setProjects] = useState([])
  const [milestones, setMilestones] = useState([])
  const [showForm, setShowForm] = useState()
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [message] = useState("");
  const {userId} = useParams();
  
  let handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setName('')
    setDate('')
    setKind('')
   
      fetch(`http://localhost:3000/users/${localStorage.user_id}/projects`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          kind: kind,
          date: date,
          user_id: userId
        }),
        headers: {
          'Content-Type': 'application/json'
         },
      }).then((response) => response.json())
      .then((data) => addProject(data))
      
     
    
    };


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
    const fetchMilestones = () => {
      fetch(`http://localhost:3000/users/${localStorage.user_id}/milestones`)
      .then(result => result.json())
      .then(milestones => setMilestones(milestones))
      
    }
    function addProject(project) {
      console.log(project)
      setProjects( projects => [...projects,{id: project.id, name: project.name, due_date: project.due_date, kind: project.kind, user_id: project.userId}] )
      console.log(projects)
      
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
        fetchMilestones();
       
    }, []);

    function findUser(users) {
        users.forEach(user=> {
            if (localStorage.email === user.email) { 
              localStorage.user_id = user.id
            fetchProjects() 
            }
          })
    }
    
  return (
    
    <div classname='page'>
    <h1>Active Projects</h1>   <h4 onClick = {() => setShowForm(true)} className = 'page'>Add Project</h4> 
    <br />
    
    { showForm    
            ? <div className = 'Menu'>  
                <div onClick = {() => setShowForm(false)} className = 'Invisible'></div>
    <form className='embed' onSubmit={handleSubmit}>
  
        <input required
          type="text"
          value={name}
          placeholder="Name"
          className='input-container'
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input 
          type="text"
          value={kind}
          placeholder="Type"
          className='input-container'
          onChange={(e) => setKind(e.target.value)}
        />
        <br></br>
        <input required
          type="date"
          value={date}
          placeholder="Date"
          className='input-container'
          onChange={(e) => setDate(e.target.value)}
        />
        <br></br>
        <button className='normal' type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
        <br />
     </form>
                </div>
                : null
                }
    <ul>
        {projects.map(project => (<li key={project.id}>  <NavLink to={`/projects/${project.id}`} > {project.name}  </NavLink><br></br> {project.kind}<br></br> Due Date: {project.due_date} <button className='normal' onClick={() => {deleteProject(project.id)}}>delete</button>   </li>
        ))}
       
        <br />
        <br />
        <h1>Active Milestones</h1>
        <br></br>
                
        {milestones.map(project => (<li key={project.id}>   {project.name}  <br></br> {project.description}<br></br> Due Date:{project.due_date} <button className='normal' onClick={() => {deleteProject(project.id)}}>delete</button>   </li>
        ))}
        <br></br>
        <NavLink to="/logout">Logout</NavLink>
        </ul> 
    </div>
  )
        
}
        



export default User