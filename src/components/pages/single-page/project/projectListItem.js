import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import { Card } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function ProjectListItem({ project, showProject, milestones, showEditForm, confirmDeleteProject, showMilestoneForm, selectedProject, hideProject}) {
  const today = dayjs();
  const dueDate = dayjs(project.due_date);
  const [isClicked, setIsClicked] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState([])


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

  useEffect(() => {
    const projectMilestones = milestones.filter((p) => p.project_id === project.id);
    const completedMilestones = projectMilestones.filter((p) => p.complete === true);
    const percentage = (completedMilestones.length / projectMilestones.length) * 100;

    setCompletionPercentage(percentage);
    console.log(completionPercentage)
  }, [milestones, project.id]);
  

  return (
    <li key={project.id}>
      <Card  className={project === selectedProject ? 'bootstrap_card grey-effect' : 'bootstrap_card'} onClick={() => handleClick(project) } onHide={() => hideProject(project)}>
      
      <div className="card-content">
         <div className="project-progress">
            <b className='project-name'>{project.name}</b>
           <div id='progress-bar-text'> <CircularProgressbar text={completionPercentage}styles={{ textSize:'150px'}} value={completionPercentage} className="circular-progress" /></div>
          </div>
      <p className='project-type'>{project.kind}</p>

      <p>Deadline | {dueDate.format('MM.DD.YYYY')}</p>

     <p>{!project.complete && `${dueDate.diff(today, 'day')} days remaining`}</p> 
        <div className='card-link-list'>

        <div className="card-links" onClick={handleMilestoneClick}>
             add milestone
          </div> 

          <div className="card-links" onClick={handleEditClick}>
            edit
          </div>

          <div className="card-links" onClick={handleDeleteClick}>
            delete
          </div>
    
        

            </div>
            </div>
      </Card>
    </li>
  );
}

export default ProjectListItem;