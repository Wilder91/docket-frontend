import React, {useEffect, useState} from 'react'
import dayjs from 'dayjs';
import {Card} from 'react-bootstrap';

const today = dayjs();

function UrgentMilestones(props){
    const [milestones, setMilestones] = useState([])

    function selectMilestones(){
        if (props.milestones) {
            setMilestones(props.milestones.filter(m => (dayjs(m.due_date).diff(today, 'day')) <= 30 && (dayjs(m.due_date).diff(today, 'day')) > 0))
        }
    }

    useEffect(() => {
        selectMilestones()
    }, [])

    return(
        <>
         <h1>Urgent Milestones</h1>
         {milestones.length > 0 ?
            <Card>
                {milestones.map((m) =>(<li key={m.id}> 
                    <h1 className="project-names" style={{color: "red"}}>{m.name}</h1> {dayjs(m.due_date).diff(today, 'day')} days remaining 
                </li>))}
            </Card>
            :
            <p>No urgent milestones</p>
         }
        </>
    )
}

export default UrgentMilestones