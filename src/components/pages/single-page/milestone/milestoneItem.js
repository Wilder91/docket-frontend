import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { gapi } from 'gapi-script';
import dayjs from 'dayjs';
import Overdue from '../../images/Overdue.png';
import Urgent from '../../images/Upcoming.png';
import Nonurgent from '../../images/NonUrgent.png';
import MediumUrgent from '../../images/MediumUrgent.png';
import Button from 'react-bootstrap/Button'

const token = sessionStorage.token;

function Milestone({ user, setUser, milestone, milestones, setMilestones, showMilestoneEditForm, today }) {
  const dueDate = dayjs(milestone.due_date);
  const getFlagImage = () => {
    const daysUntilDue = dueDate.diff(today, 'day');

    if (milestone.complete === true) {
      return <h5>complete</h5>;
    } else if (daysUntilDue < 0) {
      return <img src={Overdue} className='flag' alt="Overdue" />;
    } else if (daysUntilDue < 14) {
      return <img src={Urgent} className='flag' alt="Urgent" />;
    } else if (daysUntilDue < 30) {
      return <img src={MediumUrgent} className='flag' alt="Urgent" />;
    } else {
      return <img src={Nonurgent} className='flag' alt="Longtime" />;
    }
  };

  const confirmDeleteMilestone = (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      deleteMilestone(id);
    }
  };

  const handleComplete = (id) => {
    const newComplete = !milestone.complete;
    const updatedData = {
      complete: newComplete,
    };
  
    fetch(`http://localhost:3000/milestones/${id}/complete`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${sessionStorage.token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error updating milestone');
        }
        return response.json();
      })
      .then((data) => {
        // Milestone has been successfully marked as complete, update state:
        const updatedMilestones = milestones.map((m) => {
          if (m.id === id) {
            return { ...m, complete: newComplete };
          }
          return m;
        });
        setMilestones(updatedMilestones);
        console.log('Milestones after update:', updatedMilestones); // Log the updated state
  
        console.log('Milestone updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating milestone:', error);
      });
  };
 
  

  

  function deleteMilestone(id) {
    fetch(`http://localhost:3000/milestones/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Milestone deleted successfully:', response);
          const updatedMilestones = milestones.filter((milestone) => milestone.id !== id);
          setMilestones(updatedMilestones);
          const updatedUserMilestones = user.milestones.filter((milestone) => milestone.id !== id);
          setUser({ ...user, milestones: updatedUserMilestones });
        } else {
          throw new Error('Failed to delete milestone');
        }
      })
      .catch((error) => {
        console.error('Error deleting milestone:', error);
      });
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '289087849938-v7ckrcf04la568qv6iuepemv7n9qkvcu.apps.googleusercontent.com'
                   ,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <li key={milestone.id} style={{ opacity: milestone.complete === true && '20%' }}>
    <Card className="bootstrap-card-no-hover">
      <div className='flag-container'>
        {getFlagImage()}
      
      </div>
     
      <div className='card-content'>
      
        <b style={{ color: milestone.complete === true && 'red' }}>
          {milestone.name}
        </b>
      
        <br />
        {milestone.project_name}
        {milestone.description}
        <br />
        <p>Due {dayjs(milestone.due_date).format('MM.DD.YYYY')} </p>
        {milestone.complete !== true && (
          <p style={{ color: dayjs(milestone.due_date).diff(today, 'day') <= 0 ? 'red' : 'inherit' }}>
            {dayjs(milestone.due_date).diff(today, 'day') <= 0
              ? `${dayjs(milestone.due_date).diff(today, 'day') * -1} days Overdue`
              : `${dayjs(milestone.due_date).diff(today, 'day')} days remaining`}
          </p>
        )}
          <p onClick={() => handleComplete(milestone.id)} className='card-links' id='complete-button'>mark complete</p>
        <div className='card-link-list' id='milestone-link-list'>
        <p className="card-links" onClick={() => showMilestoneEditForm(milestone)}>
          edit
        </p>
        <p className="card-links" onClick={() => confirmDeleteMilestone(milestone.id)}>
          delete
        </p>
      
        </div>
      </div>
    </Card>
  </li>
);
}

export default Milestone;