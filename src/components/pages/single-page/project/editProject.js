import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';

function editProject({project}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [message] = useState("");
 

  function addProject() {
    console.log(project)
  }

  useEffect(() => {
    console.log(project)
    setName(project.name)
    setKind(project.kind)
    setDate(project.due_date)           
  }, []);
let handleSubmit = (e) => {
  
  e.preventDefault();
  e.target.reset();
  setName('')
  setDate('')
  setKind('')
  alert(`Project Updated`);
  navigate(`/home`)
  
  fetch(`http://localhost:3000/projects/${project.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      kind: kind,
      date: date,
      
    }),
    headers: new Headers( {
      Authorization: `${localStorage.token}`, 
      'Content-Type': 'application/json'
    }),
  }).then((response) => response.json())
    .then((data) => addProject(data))

};

  return (
  <form className='embed' onSubmit={handleSubmit}>
    <h1>Edit Project Details</h1>
  <input required
    type="text"
    defaultValue={project.name}
    
    
    className='input-container'
    onChange={(e) => setName(e.target.value)}
  />
  <br></br>
  <input 
    type="text"
    defaultValue={project.kind}
    
    
    className='input-container'
    maxLength={50}
    onChange={(e) => setKind(e.target.value)}
  />
  <br></br>
  <input required
    type="date"
    defaultValue={project.due_date}
    
    
    className='input-container'
    onChange={(e) => setDate(e.target.value)}
  />
  <br></br>
  <button className='normal' type="submit">Create</button>
  <div className="message">{message ? <p>{message}</p> : null}</div>
  <br />
</form>
  )
}

export default editProject
