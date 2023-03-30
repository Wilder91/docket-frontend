import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function AddTemplate() {
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
    if (index === 0) return // Prevent deleting the first milestone
    const newMilestones = [...milestones]
    newMilestones.splice(index, 1)
    setMilestones(newMilestones)
  }

  return (
    <Form className='embed' onSubmit={handleSubmit}>
      <h1>New Template</h1>

      <Form.Group controlId='formTemplateName'>
        <Form.Label>Template Name</Form.Label>
        <Form.Control
          required
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      {milestones.map((milestone, index) => (
        <Form.Group key={index} controlId={`formMilestone${index}`}>
          <Row>
            <Col>
              <Form.Label>Milestone {index + 1}</Form.Label>
              <Form.Control
                required
                type='text'
                value={milestone.name}
                onChange={(e) =>
                  handleMilestoneChange(index, 'name', e.target.value)
                }
              />
            </Col>
            <Col>
              <Form.Label>Lead Time</Form.Label>
              <Form.Control
                required
                type='number'
                min='1'
                step='1'
                value={milestone.leadTime}
                onChange={(e) =>
                  handleMilestoneChange(index, 'leadTime', e.target.value)
                }
              />
            </Col>
            <Col>
          {index !== 0 && (
            <Button
              variant='danger'
              type='button'
              onClick={() => deleteMilestone(index)}
            >
              Delete
            </Button>
          )}
        </Col>
      </Row>
    </Form.Group>
  ))}
  <br />
  <Button variant='secondary' type='button' onClick={addMilestone}>
    Add Milestone
  </Button>
  <br />
  <Button variant='primary' type='submit'>
    Create
  </Button>
</Form>
)
}

export default AddTemplate