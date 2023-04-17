import React from 'react';
import dayjs from 'dayjs';
import { Card } from 'react-bootstrap';


function ProjectListItem({ project, showProject, showEditForm, confirmDeleteProject, showMilestoneForm }) {
  const today = dayjs();
  const dueDate = dayjs(project.due_date);

  const handleFlagClick = (e) => {
    e.stopPropagation();
    console.log(project.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    showEditForm(project.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    confirmDeleteProject(project.id);
  };

  const handleMilestoneClick = (e) => {
    e.stopPropagation();
    showMilestoneForm(project);
  };

  

  return (
    <li key={project.id}>
      <Card className="bootstrap_card" onClick={() => showProject(project)}>
      
        <div className="card-title">
          {project.name}
        </div>
        <div className="card-body">
          {project.kind}
          <br />
          Deadline | {dueDate.format('MM.DD.YYYY')}
          <br />
          {!project.complete && `${dueDate.diff(today, 'day')} days remaining`}
          <br />
          <button className="normal" onClick={handleEditClick}>
            edit
          </button>
          <button className="normal" onClick={handleDeleteClick}>
            delete
          </button>
          <button className="normal" onClick={handleMilestoneClick}>
            Add Milestone
          </button>
        </div>
      </Card>
    </li>
  );
}

export default ProjectListItem;