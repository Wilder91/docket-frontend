import React, { useState }  from 'react';
import {NavLink,  useParams} from 'react-router-dom';



function MilestoneForm() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const {projectId} = useParams();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:3000/projects/${projectId}/milestones`, {
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
      })
      
     
      if (res.status === 200) {
        setName("");
        setDescription("");
        setDate("");
        setMessage("milestone created successfully");
       
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
      }
    };
 
    return (

<div className="form-container">
 
   
     <form onSubmit={handleSubmit}>
     <h1>Add a milestone</h1>
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
        <br />
        <button className='normal' type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
    
        <NavLink to={`/projects/${projectId}`}>Return to Project Milestones</NavLink>
     </form>
     
  
   
     
</div>
    )
    
  }
  




export default MilestoneForm;
