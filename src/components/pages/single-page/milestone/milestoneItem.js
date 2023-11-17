import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { gapi } from 'gapi-script';
import dayjs from 'dayjs';
import Overdue from '../../images/Overdue.png';
import Urgent from '../../images/Upcoming.png';
import Nonurgent from '../../images/NonUrgent.png';
import MediumUrgent from '../../images/MediumUrgent.png';
import Modal from 'react-bootstrap/Modal';
import Notes from './notes.js';

function Milestone({
  user,
  setUser,
  milestone,
  milestones,
  setMilestone,
  setMilestones,
  showMilestoneEditForm,
  today,
}) {
  const dueDate = dayjs(milestone.due_date);
  const iso8601DueDate = dayjs(milestone.due_date).format('YYYY-MM-DDTHH:mm:ssZ');
const iso8601EndDate = dayjs(milestone.due_date).add(1, 'hour').format('YYYY-MM-DDTHH:mm:ssZ');
  const isComplete = milestone.complete;
  const [showNotesModal, setShowNotesModal] = useState(false);
  const token = sessionStorage.token;

  // Store the Google Calendar event ID
  const [googleEventId, setGoogleEventId] = useState(null);

  // Function to get the appropriate flag image based on due date
  const getFlagImage = () => {
    const daysUntilDue = dueDate.diff(today, 'day');

    if (isComplete) {
      return <img src={Nonurgent} className='flag' alt='Longtime' />;
    } else if (daysUntilDue < 0) {
      return <img src={Overdue} className='flag' alt='Overdue' />;
    } else if (daysUntilDue < 14) {
      return <img src={Urgent} className='flag' alt='Urgent' />;
    } else if (daysUntilDue < 30) {
      return <img src={MediumUrgent} className='flag' alt='Urgent' />;
    } else {
      return <img src={Nonurgent} className='flag' alt='Longtime' />;
    }
  };

  // Function to display the completion date
  const getCompletionDate = () => {
    if (isComplete) {
      return (
        <div className='completion-date'>
          Completed on {dayjs(milestone.completion_date).format('MM/DD/YYYY')}
          <br />
        </div>
      );
    }
    return null; // Return null when not complete
  };

  function deleteMilestone(id, removeFromGoogleCalendar) {
    fetch(`http://localhost:3000/milestones/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Milestone deleted successfully:', response);
          const updatedMilestones = milestones.filter((m) => m.id !== id);
          setMilestones(updatedMilestones);
          const updatedUserMilestones = user.milestones.filter((m) => m.id !== id);
          setUser({ ...user, milestones: updatedUserMilestones });

          if (removeFromGoogleCalendar && googleEventId) {
            // Call a function to remove the event from Google Calendar
            removeEventFromGoogleCalendar(googleEventId);
          }
        } else {
          throw new Error('Failed to delete milestone');
        }
      })
      .catch((error) => {
        console.error('Error deleting milestone:', error);
      });
  }

  const createGoogleCalendarEvent = async () => {
    const event = {
      'summary':milestone.name,
      'description': milestone.project_name,
      'start': {
        'dateTime': iso8601DueDate,
        'timeZone': 'UTC',
      },
      'end': {
        'dateTime': iso8601EndDate,
        'timeZone': 'UTC',
      },
    };
    console.log('Event info: ', event)
    console.log(iso8601DueDate)
    console.log(iso8601EndDate)

    console.log('Google Calendar API Request Payload:', {
      method: 'POST',
      url: 'https://content.googleapis.com/calendar/v3/calendars/primary/events',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.google_token}`,
      },
      body: JSON.stringify({ resource: event }),
    });
    try {
      console.log('Before Google Calendar API Request');
      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      console.log('Response:', response);
      setGoogleEventId(response.result.id);
      console.log('Event added to Google Calendar:', response);
    }  catch (error) {
      console.error('Error adding event to Google Calendar:', error);
      
      if (error.result && error.result.error) {
        console.error('Google Calendar API Error:', error.result.error);
      }
  
      if (error.status === 401) {
        console.error('Authentication error. User is not signed in or token expired.');
      }
    }
  };
  
  
  const removeEventFromGoogleCalendar = (eventId) => {
    // Check if the Google API client is loaded and authenticated
    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      // Make a request to the Google Calendar API to delete the event
      gapi.client.calendar.events
        .delete({
          calendarId: 'primary', // Use 'primary' for the user's primary calendar
          eventId: eventId, // The ID of the event you want to delete
        })
        .then((response) => {
          console.log('Event removed from Google Calendar:', response);
        })
        .catch((error) => {
          console.error('Error removing event from Google Calendar:', error);
        });
    } else {
      console.error('User is not signed in to Google Calendar or token has expired.');
    }
  };
  

  const handleGoogleSignIn = async () => {
    try {
      console.log('Initiating Google Sign-In...');
      await gapi.auth2.getAuthInstance().signIn();
      console.log('Google Sign-In successful. Creating Google Calendar Event...');
      // After successful sign-in, you can proceed to create the event.
      createGoogleCalendarEvent();
    } catch (error) {
      console.error('Google Sign-In Error:', error);
  
      if (error.details) {
        console.error('Google Sign-In Error Details:', error.details);
      }
    }
  };
  

  // Function to open the notes modal
  const openNotesModal = () => {
    setShowNotesModal(true);
  };

  // Function to close the notes modal
  const closeNotesModal = () => {
    setShowNotesModal(false);
  };

  // Function to confirm and delete a milestone
  const confirmDeleteMilestone = (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      const removeFromGoogleCalendar = window.confirm('Do you want to remove it from Google Calendar as well?');
      deleteMilestone(id, removeFromGoogleCalendar);
    }
  };

  // Function to handle marking a milestone as complete
  const handleComplete = (id) => {
    const newComplete = !milestone.complete;
    const updatedData = {
      complete: newComplete,
      completion_date: dayjs().format('DD/MM/YYYY'),
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

  useEffect(() => {
    async function start() {
      await gapi.client.init({
        clientId: '494043831138-f2m2q99nb0if9m034el6vp645n9sffsn.apps.googleusercontent.com',
        apiKey: 'AIzaSyD-p5VKHy-5uiw2o_-hjdO0Pnvly2TSnEg', // If you're using an API key
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar', // Use the appropriate scope for calendar access
        ux_mode: 'popup',
        plugin_name:'login',
      });

      // The client is now initialized and can be used for API calls.
    }

    gapi.load('client:auth2', start);
  }, []);

  return (
    <li key={milestone.id} style={{ opacity: isComplete && '40%' }}>
      <Card className="bootstrap-card-no-hover">
        <div className="flag-container">
          {getFlagImage()}{' '}
          <p className="account-delete-button" id="milestone-notes" onClick={openNotesModal}>
            notes
          </p>
        </div>
        <br />
        <div className="card-content">
          <b>{milestone.name}</b>
          <br />
          {getCompletionDate()} {/* Render completion date when complete */}
          {milestone.complete ? (
            <p style={{ lineHeight: 2 }}>{milestone.project_name}</p>
          ) : (
            milestone.project_name
          )}
          {milestone.description}
          <p className="milestone-due-date">{dayjs(milestone.due_date).format('MM.DD.YYYY')}</p>
          {!isComplete && (
            <p
              style={{
                lineHeight: 0,
                color: dayjs(milestone.due_date).diff(today, 'day') <= 0 ? 'red' : 'inherit',
              }}
            >
              {dayjs(milestone.due_date).diff(today, 'day') <= 0
                ? `${dayjs(milestone.due_date).diff(today, 'day') * -1} days Overdue`
                : `${dayjs(milestone.due_date).diff(today, 'day')} days remaining`}
            </p>
          )}
          <p onClick={() => handleComplete(milestone.id)} className="card-links" id="complete-button">
            mark complete
          </p>
          <div className="card-link-list" id="milestone-link-list">
            <p className="card-links" onClick={() => showMilestoneEditForm(milestone)}>
              edit
            </p>
            <p className="card-links" onClick={() => confirmDeleteMilestone(milestone.id)}>
              delete
            </p>
            <p className="account-delete-button" onClick={() => handleGoogleSignIn()}>
              add to google
            </p>
          </div>

          <Modal show={showNotesModal} onHide={closeNotesModal}>
            <Modal.Header closeButton>
              <Modal.Title>Notes on {milestone.name}({milestone.project_name})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Notes milestone={milestone} setMilestone={setMilestone} setMilestones={setMilestones} />{/* Render your Notes component here */}
            </Modal.Body>
            {/* Add a footer or additional styling for the modal as needed */}
          </Modal>
        </div>
      </Card>
    </li>
  );
}

export default Milestone;
