import React, {useEffect, useState} from 'react';
import { useNavigate} from 'react-router-dom';

function editProject({project}) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [checked, setChecked] = useState();
  const [message] = useState("");

  

 
let handleSubmit = (e) => {
  
  e.preventDefault();
  e.target.reset();
  
  
  alert(`Project Updated Succesfully`);
  navigate(`/home`)
  console.log(checked)
  fetch(`http://localhost:3000/projects/${project.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      kind: kind,
      date: date,
      template: checked
    }),
    headers: new Headers( {
      Authorization: `${localStorage.token}`, 
      'Content-Type': 'application/json'
    }),
  }).then((response) => response.json())
    .then((data) => console.log(data))

};



const handleToggle = () => {
  console.log(checked)
 setChecked(current => !current);
 console.log(checked)
  

};

useEffect(() => {
   
  setName(project.name)
  setKind(project.kind)
  setDate(project.due_date) 
  setChecked(project.template)
  
}, []);

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
    <br />
    {project.template !== true &&
    <>
    <p>Save As Template</p><input
      
      type="checkbox"
      defaultChecked={project.template}
      id="custom-switch"

      onChange={handleToggle}
  
    /></>}
    <br />
    <button className='normal' type="submit">Update</button>
    <div className="message">{message ? <p>{message}</p> : null}</div>
    
</form>
  )
}

export default editProject
