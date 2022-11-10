import React, { useState }  from 'react';
import {NavLink, useParams} from 'react-router-dom';



function ProjectForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [message, setMessage] = useState("");
  const {userId} = useParams();

  

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:3000/users/${localStorage.user_id}/projects`, {
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
      })
      
     
      if (res.status === 200) {
        setName("");
        setKind("");
        setDate("");
        setMessage("Project created successfully");
       
      } else {
        setMessage("Project Created Succesfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };
 
    return (

<div className="form-container">
  <div className="vertical-center">
    
     <form onSubmit={handleSubmit}>
     <h1>Add a Project</h1>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={kind}
          placeholder="Kind"
          onChange={(e) => setKind(e.target.value)}
        />
        <br></br>
        <input
          type="date"
          value={date}
          placeholder="Date"
          onChange={(e) => setDate(e.target.value)}
        />
        <br></br>
        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
        
        <NavLink to='/user'>Return to Projects</NavLink>
     </form>
     
     </div>
   
     
</div>
    )
    
  }
  




export default ProjectForm;
