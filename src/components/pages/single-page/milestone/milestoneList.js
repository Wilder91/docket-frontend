import React, { useState } from 'react';
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
  today,
}) {
  const [filterCriteria, setFilterCriteria] = useState('all');

  // Define the sorting function (as shown in the previous answer)
  const sortMilestones = (criteria) => {
    // ... (same sorting logic)

    return sortedMilestones;
  };

  // Filter milestones based on the filter criteria
  const filterMilestones = (criteria) => {
    if (criteria === 'incomplete') {
      return milestones.filter((milestone) => !milestone.complete);
    } else if (criteria === 'completed') {
      return milestones.filter((milestone) => milestone.complete);
    } else {
      return milestones; // 'all' or any other criteria
    }
  };

  // Sort and filter milestones based on the filter criteria
  const sortedMilestones = sortMilestones(filterCriteria);
  const filteredMilestones = filterMilestones(filterCriteria);
  console.log(filteredMilestones)
  const handleFilterButtonClick = (criteria) => {
    setFilterCriteria(criteria);
  };

  return (
    <div className="milestone-list">
      <div className='headline'> Milestones  
        <div id='milestone-options'>
          <p className='milestone-options-button' onClick={() => handleFilterButtonClick('all')} >all</p> 
          <p className='milestone-options-button' onClick={() => handleFilterButtonClick('incomplete')}>incomplete</p>
          <p className='milestone-options-button' onClick={() => handleFilterButtonClick('completed')}>completed</p>
        </div>
      </div>
      <div className="Container">
        {filteredMilestones.length === 0 && <h5>No milestones (yet)</h5>}
        <ul>
          {filteredMilestones.map((milestone) => (
            <div key={milestone.id}>
              <Milestone
                user={user}
                setUser={setUser}
                milestone={milestone}
                setMilestone={setMilestone}
                handleMilestoneToggle={handleMilestoneToggle}
                showMilestoneEditForm={showMilestoneEditForm}
                milestones={filteredMilestones} // Use filtered milestones here
                setMilestones={setMilestones}
                today={today}
              />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MilestoneList;