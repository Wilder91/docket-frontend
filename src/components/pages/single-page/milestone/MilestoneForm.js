import React, {useState} from 'react';
import {useParams} from 'react-router-dom'

function milestoneForm({setMilestones}) {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message] = useState("");
  const {projectId} = useParams();
  
  function addMilestone(milestone) {
    console.log(milestone)
    setMilestones( milestones => [...milestones,{id: milestone.id, name: milestone.name, due_date: milestone.due_date, description: milestone.description, project_id: milestone.projectId}].sort(function(a,b){
        return new Date(a.due_date) - new Date(b.due_date);
      }) )

  }
    
  let handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setName('')
    setDate('')
    setDescription('')
      
    fetch(`http://localhost:3000/users/${localStorage.user_id}/projects/${projectId}/milestones`, {
      method: "POST",
      body: JSON.stringify({
        name: name,
        description: description,
        date: date,
        project_id: projectId
      }),
      headers: new Headers( {
        Authorization: localStorage.token,
        'Content-Type': 'application/json'
        }),
    }).then((response) => response.json())
    .then((data) => addMilestone(data))
        
        
      
      };
  
        


return(
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
  placeholder="Description(50 character limit)"
  className='input-container'
  maxLength={50}
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
)
}
export default milestoneForm