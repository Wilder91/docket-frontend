import React, {Component} from "react";

class Milestones extends Component {
    constructor() {
        super();
        this.state = {milestones: []};
       
    }

    componentDidMount() {
      fetch(`http://localhost:3000/milestones`)
      .then(result => result.json())
      .then(milestones => this.setState({milestones}))
    }

    render() {
       
        return (
            <div>
              <h1>{this.state.milestones.map(milestone=><li key={milestone.id}>{milestone.name} {milestone.description} {milestone.due_date }</li>)}</h1>            
            </div>
        );
    }
  }


export default Milestones