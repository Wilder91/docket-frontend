import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs';
import {Card} from 'react-bootstrap';
const today = dayjs();
function urgentMilestones(props){
    const [milestones, setMilestones] = useState([])

    function selectMilestones(){
        setMilestones(props.milestones.filter(m => (dayjs(m.due_date).diff(today, 'day')) <= 30 && (dayjs(m.due_date).diff(today, 'day')) > 0))
        console.log(milestones)
    }

    useEffect(() => {
        selectMilestones()
    })

    return(
       
        <>
        
         <h1 >Urgent Milestones</h1>
        <Card>
        {milestones.map((m) =>(<li key={m.id}> 
           <h1 className="project-names" style={{color: "red"}}>{m.name}</h1> {dayjs(m.due_date).diff(today, 'day')} days remaining </li>))}
        </Card>
        </>
    )
}

export default urgentMilestones