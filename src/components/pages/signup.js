import React, { useState } from 'react';


import {useNavigate} from 'react-router-dom'


function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:3000/users`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
          headers: new Headers( {
            Authorization: localStorage.token,
            })
         },
      })
      
     
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        
       
      } 
    } catch (err) {
      console.log(err);
    }
    localStorage.email = email 
    localStorage.password= password
    navigate('/home');
  };

  
 
    return (


<div className="form-container">


  

     <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <input required className = "input-container"
        placeholder="Name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
     <input required className = "input-container"
        placeholder="E-Mail Address"
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
       <div >
        <input required className = "input-container"
          placeholder="Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <br />
       <button type="submit" className="signup-button">Sign Up</button>  <a href="/" className="nice-button"> Log In</a>
     </form>
 
  

</div>

   )
  }
  



export default Signup;