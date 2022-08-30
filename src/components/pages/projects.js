import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Projects extends Component{
    constructor() {
        super();
        this.state = {projects: []};
    }

    componentDidMount() {
      fetch(`http://localhost:3000/projects`)
      .then(result => result.json())
      .then(projects => this.setState({projects}))
    }

    

  
  
    render() {
        return (
    
    <div>
      
            <h1>Your Active Projects</h1>
        <ul>
          {this.state.projects.map(project => (<li key={project.id}>  <NavLink to={`/projects/${project.id}`} > {project.name}  </NavLink><br></br> {project.kind}<br></br> Due Date:{project.due_date}  </li>
          ))}
          <br></br>
          <NavLink to='/addproject'> Add a New Project </NavLink>
          <br></br><br></br>
          <NavLink to="/">Logout</NavLink>
        </ul>
        
      
     
    </div>
  )
}
        

}

export default Projects