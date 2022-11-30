import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
function projectForm() {
    const [setProjects] = useState([])
    const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [kind, setKind] = useState("");
  const [message] = useState("");
  const {userId} = useParams();

  function addProject(project) {

    console.log(project)

  }
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

    return (
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
    )
}

export default projectForm
