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
  today,
}) {
  // Define the sorting function (as shown in the previous answer)
  const sortMilestones = (criteria) => {
    // Separate completed and incomplete milestones
    const completedMilestones = milestones.filter((milestone) => milestone.complete);
    const incompleteMilestones = milestones.filter((milestone) => !milestone.complete);
  
    // Sort completed milestones by completion status
    completedMilestones.sort((a, b) => (a.complete ? 1 : -1));
  
    // Sort incomplete milestones by due date
    incompleteMilestones.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
  
    // Merge the sorted arrays (completed milestones to the back)
    const sortedMilestones = [...incompleteMilestones, ...completedMilestones];
  
    return sortedMilestones;
  };

  // Sort milestones using the sorting function
  const sortedMilestones = sortMilestones(milestones);

  return (
    <div className="milestone-list">
      <div className="Container">
        {sortedMilestones.length === 0 && <h5>No milestones (yet)</h5>}
        <ul>
          {sortedMilestones.map((milestone) => (
            <div key={milestone.id}>
              <Milestone
                user={user}
                setUser={setUser}
                milestone={milestone}
                setMilestone={setMilestone}
                handleMilestoneToggle={handleMilestoneToggle}
                showMilestoneEditForm={showMilestoneEditForm}
                milestones={sortedMilestones} // Use sorted milestones here
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