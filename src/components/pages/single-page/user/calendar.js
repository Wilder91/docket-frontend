import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function UserSchedule({ milestones }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];

    const formattedSelectedDate = selectedDate.toISOString().split('T')[0];

    return milestones.filter(
      (milestone) => milestone.due_date === formattedSelectedDate
    );
  };

  const tileContent = ({ date, view }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const hasEvent = milestones.some(
      (milestone) => milestone.due_date === formattedDate
    );

    return hasEvent ? <p>•</p> : null;
  };

  return (
    <div className='calendar-box'>
      <Calendar
        className='user-calendar'
        onClickDay={handleDateClick}
        tileContent={tileContent}
      />
      <br />
      {selectedDate && (
        <div className='calendar-details'>
          <h4>{selectedDate.toDateString()}</h4>
          <br />
          {getEventsForSelectedDate().length > 0 ? (
            getEventsForSelectedDate().map((event, index) => (
              <div key={index}>
                <p>
                  Milestone: {event.name}
                  <br />
                  Project: {event.project_name}
                </p>
                {index !== getEventsForSelectedDate().length - 1 && <hr />} {/* Add a horizontal line between events */}
              </div>
            ))
          ) : (
            <p>No milestones due on this date</p>
          )}
        </div>
      )}
    </div>
  );
}

export default UserSchedule;
