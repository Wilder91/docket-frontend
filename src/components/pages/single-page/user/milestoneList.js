import React, { useEffect, useState } from 'react';
import MilestoneItem from './milestoneItem';
import MilestoneForm from '../milestone/MilestoneForm';



function MilestoneList({ milestones, setMilestones, templates, user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [milestoneToEdit, setMilestoneToEdit] = useState(null);
    
    const handleShowForm = () => {
      setIsOpen(true);
    };
  
    const handleHideForm = () => {
      setIsOpen(false);
      setMilestoneToEdit(null);
    };
  
    const handleShowEditForm = (milestone) => {
      setIsOpen(true);
      setMilestoneToEdit(milestone);
    };
  
    const handleDeleteMilestone = (id) => {
      const updatedMilestones = milestones.filter((milestone) => milestone.id !== id);
      setMilestones(updatedMilestones);
    };
  
    const handleCompleteMilestone = (id) => {
      const updatedMilestones = milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, complete: !milestone.complete } : milestone
      );
      setMilestones(updatedMilestones);
    };
  
    return (
      <>
        <br />
        <h1>Milestones</h1>
        <br />
        {milestones.length === 0 && <h5>no milestones here</h5>}
        {milestones.map((milestone) => (
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            handleCompleteMilestone={handleCompleteMilestone}
            handleDeleteMilestone={handleDeleteMilestone}
            handleShowEditForm={handleShowEditForm}
          />
        ))}
        <br />
        <button className="normal" onClick={handleShowForm}>
          Add Milestone
        </button>
        <MilestoneForm
          isOpen={isOpen}
          onClose={handleHideForm}
          templates={templates}
          user={user}
          milestones={milestones}
          setMilestones={setMilestones}
          milestoneToEdit={milestoneToEdit}
        />
      </>
    );
  }

  export default MilestoneList