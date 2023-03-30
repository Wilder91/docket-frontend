import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'

function AddTemplate(props) {
  const [name, setName] = useState('')
  const [milestones, setMilestones] = useState([{ name: '', leadTime: '' }])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/users/${sessionStorage.user_id}/templates`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        milestones: milestones,
      }),
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...milestones]
    newMilestones[index][field] = value
    setMilestones(newMilestones)
  }

  const addMilestone = () => {
    setMilestones([...milestones, { name: '', leadTime: '' }])
  }

  const deleteMilestone = (index) => {
    const newMilestones = [...milestones]
    newMilestones.splice(index, 1)
    setMilestones(newMilestones)
  }

  return (
    <Form className='embed' onSubmit={handleSubmit}>
      <h1>New Template</h1>

      <input
        required
        type='text'
        value={name}
        placeholder='Template Name'
        className='input-container'
        onChange={(e) => setName(e.target.value)}
      />

      {milestones.map((milestone, index) => (
        <div key={index}>
          <input
            required
            type='text'
            value={milestone.name}
            placeholder={`Milestone ${index + 1}`}
            className='input-container'
            onChange={(e) =>
              handleMilestoneChange(index, 'name', e.target.value)
            }
          />

          <input
            required
            type='number'
            value={milestone.leadTime}
            placeholder='Lead Time'
            className='input-container'
            onChange={(e) =>
              handleMilestoneChange(index, 'leadTime', e.target.value)
            }
          />

          {index !== 0 && (
            <button
              className='normal'
              type='button'
              onClick={() => deleteMilestone(index)}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      <button className='normal' type='button' onClick={addMilestone}>
        Add Milestone
      </button>

      <button className='normal' type='submit'>
        Create
      </button>

      <br />
    </Form>
  )
}

export default AddTemplate