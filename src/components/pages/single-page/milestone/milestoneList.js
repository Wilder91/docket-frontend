import React from 'react';
import Milestone from './milestoneItem';
function MilestoneList({
  user,
  setUser, 
  milestones, 
  setMilestones, 
  milestone, 
  setMilestone, 
  handleMilestoneToggle, 
  showMilestoneEditForm, 
  today}) {


  return (
    <div className="milestone-list">
      <div className='Container'>
      

        {milestones.length === 0 && <h5>No milestones (yet)</h5> }
        <ul>
          {milestones.map(milestone => (
            <div key={milestone.id}>
              <Milestone 
                user={user}
                setUser={setUser}
                milestone={milestone} 
                setMilestone={setMilestone}
                handleMilestoneToggle={handleMilestoneToggle} 
                showMilestoneEditForm={showMilestoneEditForm} 
                milestones={milestones}
                setMilestones={setMilestones}
                today={today} 
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MilestoneList;