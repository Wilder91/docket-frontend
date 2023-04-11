import React from 'react';
import { FaFlag } from 'react-icons/fa';
import dayjs from 'dayjs';
import { Card } from 'react-bootstrap';

function ProjectListItem({ project, showProject, showEditForm, confirmDeleteProject, showMilestoneForm }) {
  const today = dayjs();

  return (
    <li key={project.id}>
      <Card className='bootstrap_card' onClick={() => showProject(project)}>
        {project.complete === true && <h5>complete</h5>}
        <div className="card-title">
          <FaFlag
            onClick={() => console.log(project.id)}
            style={{ color: project.complete ? 'grey' : 'red' }}
          />
          <br />
          {project.name}
        </div>
        <div className="card-body">
          {project.kind}
          <br />
          Deadline | {dayjs(project.due_date).format('MM.DD.YYYY')}
          <br />
          {project.complete === false && `${dayjs(project.due_date).diff(today, 'day')} days remaining `}
          <br />
          <button className='normal' onClick={() => showEditForm(project.id)}>edit</button>
          <button className='normal' onClick={() => confirmDeleteProject(project.id)}>delete</button>
          <button className='normal' onClick={() => showMilestoneForm(project)}>Add Milestone</button>
        </div>
      </Card>
    </li>
  );
}

export default ProjectListItem;