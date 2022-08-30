import React, { Component } from 'react';


class Project extends Component {
  render() {
  return (
   

<div className="form-container">

<div className="vertical-center">

<h1>Add a New Project</h1>
   <form>
     <div className="input-container">
       <label>Username </label>
       <input type="text" name="pname" required />
       
     </div>
     <div className="input-container">
       <label>Due Date </label>
       <input type="date" name="due_date" required />

     </div>
     <div className="button-container">
       <input type="submit" />
     </div>
   </form>
   </div>
</div>

  )
  }

}

export default Project