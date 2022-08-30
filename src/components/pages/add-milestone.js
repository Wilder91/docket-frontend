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
      let res = await fetch(`http://localhost:3000/project/${projectId}/milestones`, {
        method: "POST",
        body: JSON.stringify({
          name: name,
          description: description,
          date: date
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
  <div className="vertical-center">
    <h1>Add a milestone</h1>
     <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <input
          type="text"
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
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
        <br></br>
        <NavLink to={`/projects/${projectId}`}>Return to milestones</NavLink>
     </form>
     
     </div>
   
     
</div>
    )
    
  }
  




export default MilestoneForm;
