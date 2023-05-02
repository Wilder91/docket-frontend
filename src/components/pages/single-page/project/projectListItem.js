import React, {useState} from 'react';
import dayjs from 'dayjs';
import { Card } from 'react-bootstrap';


function ProjectListItem({ project, showProject, showEditForm, confirmDeleteProject, showMilestoneForm, selectedProject, hideProject}) {
  const today = dayjs();
  const dueDate = dayjs(project.due_date);
  const [isClicked, setIsClicked] = useState(false);

 
  function handleClick(project) {
    showProject(project);
    setIsClicked(!isClicked);
  }
  const handleEditClick = (e) => {
    e.stopPropagation();
    showEditForm(project);
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
      <Card className={project === selectedProject ? 'bootstrap_card grey-effect' : 'bootstrap_card'} onClick={() => handleClick(project)} onHide={() => hideProject(project)}>
      
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