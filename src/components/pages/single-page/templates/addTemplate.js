import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
function addTemplate(props){
    const [name, setName] = useState([])

    let handleSubmit = (e) => {
        e.preventDefault()
    }

 
    return (
        <Form className='embed' onSubmit={handleSubmit}>
        <h1>New Template</h1>
        
        <input required
          type="text"
          value={name}
          placeholder="Name"
          className='input-container'
          onChange={(e) => setName(e.target.value)}
        />
      
        <button className='normal' type="submit">Create</button>

        <br />
     </Form>
        
    )
}

export default addTemplate