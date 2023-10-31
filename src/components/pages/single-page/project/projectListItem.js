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
      
      <div className="card-content">
      <b>{project.name}</b>
      <p>{project.kind}</p>
      <br />
      <p>Deadline | {dueDate.format('MM.DD.YYYY')}</p>
      <br />
      {!project.complete && `${dueDate.diff(today, 'day')} days remaining`}
  
          <p className="card-links" onClick={handleEditClick}>
            edit
          </p>
    
          <p className="card-links" onClick={handleMilestoneClick}>
            Add Milestone
          </p>

          <p className="card-links" onClick={handleDeleteClick}>
            delete
          </p>
          </div>
       
      </Card>
    </li>
  );
}

export default ProjectListItem;