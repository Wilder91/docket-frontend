import React, { useEffect, useState} from 'react'
import { NavLink, useParams} from 'react-router-dom';

function Project() {
    const [milestones, setMilestones] = useState([])
    const [showForm, setShowForm] = useState()

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [message] = useState("");
    const {projectId} = useParams();

    let handleSubmit = async (e) => {
        e.preventDefault();
        e.target.reset();
        setName('')
        setDate('')
        setDescription('')
       
          fetch(`http://localhost:3000/projects/${projectId}/milestones`, {
            method: "POST",
            body: JSON.stringify({
              name: name,
              description: description,
              date: date,
              project_id: projectId
            }),
            headers: {
              'Content-Type': 'application/json'
             },
          }).then((response) => response.json())
          .then((data) => addMilestone(data))
          
         
        
        };
    
    function addMilestone(data) {
        console.log(data)
        setMilestones( milestones => [...milestones,{id: data.id, name: data.name, description: data.description, due_date: data.due_date, project_id: data.projectId}] )
        console.log(milestones)
        //okay so you're gonna have to figure out how to get the data from the form into the 
        //milestones array
    }
    const fetchMilestones = () => {
        fetch(`http://localhost:3000/projects/${projectId}/milestones`)
        .then(result => result.json())
        .then(data =>setMilestones(data))
    }

    function deleteMilestone(id) {
        fetch(`http://localhost:3000/milestones/${id}`, { method: 'DELETE' })   
        removeMilestone(id)      
    }

    function removeMilestone(id) {      
        setMilestones(milestones.filter(a =>
            a.id !== id
          )
        )
    }
        
    useEffect(() => {
        fetchMilestones({});
        console.log(milestones)
    }, []);

     return (    
        <div className='page'>
        <h1>Active Milestones</h1>
        <br />
        <li onClick = {() => setShowForm(true)} className = 'page'>Add Milestone</li> 
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
          value={description}
          placeholder="description"
          className='input-container'
          onChange={(e) => setDescription(e.target.value)}
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
    
       
     </form>
    </div>
    : null
    }
        <ul>
        {milestones.map(milestone => (<li key={milestone.id}>   <b>{milestone.name}</b> <br></br>  {milestone.description}<br></br> Due Date:{milestone.due_date} <br></br> <button className='normal' onClick={() => {deleteMilestone(milestone.id)}}>Delete</button> </li>
        ))}
       
        <br></br>
        <br></br>
        <NavLink to="/user">Return to Project List</NavLink> 
        </ul>
        </div>
        );
}   


export default Project