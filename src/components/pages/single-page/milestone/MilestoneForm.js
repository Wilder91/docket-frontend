import React, {useState, useParams} from 'react'

function milestoneForm() {

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [message] = useState("");
    const {userId} = useParams();
    
    
    let handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        setName('')
        setDate('')
        setDescription('')
       
          fetch(`http://localhost:3000/users/${localStorage.user_id}/projects`, {
            method: "POST",
            body: JSON.stringify({
              name: name,
              description: description,
              date: date,
              user_id: userId
            }),
            headers: {
              'Content-Type': 'application/json'
             },
          }).then((response) => response.json())
          .then((data) => console.log(data))
          
         
        
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
)
}
export default milestoneForm