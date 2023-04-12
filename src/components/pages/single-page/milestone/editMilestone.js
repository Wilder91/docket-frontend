import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function editMilestone({ milestone, setMilestone }) {
  const navigate = useNavigate();
  console.log(navigate);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState();
  const [message, setMessage] = useState("");
  const [updatedMilestone, setUpdatedMilestone] = useState(null); // add state variable for updated milestone data

  let handleSubmit = (e) => {

    e.preventDefault();
    e.target.reset();




    fetch(`http://localhost:3000/milestones/${milestone.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        description: description,
        date: date,
        template: checked
      }),
      headers: new Headers({
        Authorization: `${sessionStorage.token}`,
        'Content-Type': 'application/json'
      }),
    }).then((response) => response.json())
      .then((data) => {
        setUpdatedMilestone(data); // update state variable with fetched data
        console.log(data);
      })
      .catch((error) => console.error(error));
  };


  useEffect(() => {

    setName(milestone.name);
    setDescription(milestone.description);
    setDate(milestone.due_date);
    setChecked(milestone.template);

  }, [milestone]);

  useEffect(() => {
    if (updatedMilestone) {
      setName(updatedMilestone.name);
      setDescription(updatedMilestone.description);
      setDate(updatedMilestone.due_date);
      setChecked(updatedMilestone.template);
      setMilestone(updatedMilestone); // update state variable with fetched data
      setMessage("Milestone updated successfully.");
    }
  }, [updatedMilestone]);

  return (
    <form className='embed' onSubmit={handleSubmit}>
      <h1>Milestone Details</h1>

      <input required
        type="text"
        defaultValue={milestone.name}
        className='input-container'
        onChange={(e) => setName(e.target.value)}
      />
      <br></br>
      <input
        type="text"
        defaultValue={milestone.kind}
        className='input-container'
        maxLength={50}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br></br>
      <input required
        type="date"
        defaultValue={milestone.due_date}
        className='input-container'
        onChange={(e) => setDate(e.target.value)}
      />

      <button className='normal' type="submit">Update</button>
      <div className="message">{message ? <p>{message}</p> : null}</div>

    </form>
  )
}

export default editMilestone;