import React, { useEffect, useState} from 'react';
import { Card } from 'react-bootstrap';
import { gapi } from 'gapi-script';
import dayjs from 'dayjs';
import Overdue from '../../images/Overdue.png';
import Urgent from '../../images/Upcoming.png';
import Nonurgent from '../../images/NonUrgent.png';
import MediumUrgent from '../../images/MediumUrgent.png';
import Modal from 'react-bootstrap/Modal';
import Notes from './notes.js'
const token = sessionStorage.token;

function Milestone({ user, setUser, milestone, milestones, setMilestone, setMilestones, showMilestoneEditForm, today }) {
  const dueDate = dayjs(milestone.due_date);
  const isComplete = milestone.complete;
  const [showNotesModal, setShowNotesModal] = useState(false);

  const getFlagImage = () => {
    const daysUntilDue = dueDate.diff(today, 'day');

    if (isComplete) {
      return <img src={Nonurgent} className='flag' alt="Longtime" />;
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

  const getCompletionDate = () => {
    if (isComplete) {
      return <div className='completion-date'>Completed on {dayjs(milestone.completion_date).format('MM/DD/YYYY')} <br /> </div>;
      
    }
    return null; // Return null when not complete
  };

  const openNotesModal = () => {
    setShowNotesModal(true);
  };

  // Function to close the notes modal
  const closeNotesModal = () => {
    setShowNotesModal(false);
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
      completion_date: dayjs().format('DD/MM/YYYY')
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
            return { ...m, complete: newComplete, completion_date: updatedData.completion_date };
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
        clientId: '289087849938-v7ckrcf04la568qv6iuepemv7n9qkvcu.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <li key={milestone.id} style={{ opacity: isComplete && '40%' }}>
      <Card className="bootstrap-card-no-hover">
        <div className='flag-container'>
          {getFlagImage()}  <p className='account-delete-button'  id='milestone-notes'  onClick={openNotesModal}> notes</p>
        </div>
        <br />
        <div className='card-content'>
          <b>
            {milestone.name}
          </b>
          <br />
          {getCompletionDate()} {/* Render completion date when complete */}
   
          {milestone.complete ? (
  <p style={{ lineHeight: 2 }}>{milestone.project_name}</p>
) : (
  milestone.project_name
)}
          {milestone.description}
     
          <p className='milestone-due-date'>Due {dayjs(milestone.due_date).format('MM.DD.YYYY')} </p>
     
          {!isComplete && (
           <p style={{ lineHeight: 0, color: dayjs(milestone.due_date).diff(today, 'day') <= 0 ? 'red' : 'inherit' }}>
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
          <Modal show={showNotesModal} onHide={closeNotesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Notes on {milestone.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Notes milestone={milestone} setMilestone={setMilestone} setMilestones={setMilestones}/> {/* Render your Notes component here */}
        </Modal.Body>
        {/* Add a footer or additional styling for the modal as needed */}
      </Modal>
        </div>
      </Card>
    </li>
  );
}

export default Milestone;
