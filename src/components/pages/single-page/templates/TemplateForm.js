import React, {useEffect, useState} from 'react'

function templateForm(props) {
  const [name, setName] = useState("")


  useEffect(() => {
    setName(props)
    console.log(name)              
  }, []);

  return(
    <h1>hello!</h1>
  )
}

export default templateForm
