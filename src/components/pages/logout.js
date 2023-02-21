
import React, { Component } from 'react';
import {Navigate} from 'react-router-dom'

class Logout extends Component {
    componentDidMount() {
       this.clearUser()

      }

      clearUser(){
        window.localStorage.clear()
       
      }
      render() {
        return(
          <Navigate to="/" />
        )
      }
  
    

}



export default Logout