import React from 'react';
import { FaFlag } from 'react-icons/fa';
import dayjs from 'dayjs';
import { Card, Modal } from 'react-bootstrap';
import EditMilestone from '../milestone/editMilestone';

function MilestoneItem({ milestone, handleCompleteMilestone, handleDeleteMilestone, handleShowEditForm }) {
  const today = dayjs();

  return (
   <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaFlag
              onClick={() => {
                handleCompleteMilestone(milestone.id);
              }}
              style={{
                color: milestone.complete ? 'grey' : 'red',
                opacity: '100',
                marginRight: '10px',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <b style={{ color: milestone.complete && 'red' }}>{milestone.name}</b>
              <span>{milestone.project_name}</span>
            </div>
          </div>
          <div>
            <p>Due Date: {dayjs(milestone.due_date).format('MM.DD.YYYY')}</p>
            {milestone.complete === false && (
              <p style={{ color: dayjs(milestone.due_date).diff(today, 'day') <= 30 && 'red' }}>
                {dayjs(milestone.due_date).diff(today, 'day')} days remaining
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button className="normal" onClick={() => handleShowEditForm(milestone)}>
            Edit
          </button>
          <button className="normal" onClick={() => handleDeleteMilestone(milestone.id)}>
            Delete
          </button>
        </div>
        </div>
  );
}

export default MilestoneItem;