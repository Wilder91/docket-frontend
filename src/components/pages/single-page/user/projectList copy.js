import React, { useEffect, useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import { FaFlag } from 'react-icons/fa';
import dayjs from 'dayjs';
import EditProject from '../project/editProject';
import prevent from '../util/prevent';

function ProjectList(props) {
  const { user, projects, setProjects, milestones, setMilestones } = props;
  const [project, setProject] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const today = dayjs();
  const token = sessionStorage.token;

  function showProject(project) {
    if (!selectedProjects.includes(project)) {
      setSelectedProjects([...selectedProjects, project]);
    }else {
      setSelectedProjects([selectedProjects.filter((p => p !== project))]);
    }
    setProject(project);
    
  }

  function hideEditForm() {
    setEditFormOpen(false);
  }

  function showEditForm(id) {
    prevent(()=>console.log("Child Element!"))
    const project = user.projects.find((p) => p.id === id);
    setProject(project);
    setEditFormOpen(true);
  }

  function confirmDeleteProject(id) {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id, projects, milestones, setProjects, setMilestones);
    }
  }

  async function deleteProject(id) {
    const projectMilestones = milestones.filter(m => m.project_id === id);
    await Promise.all(projectMilestones.map(m => deleteMilestone(m.id)));
  
    try {
      const response = await fetch(`http://localhost:3000/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete project with id ${id}`);
      }

  
      setMilestones(milestones.filter(m => m.project_id !== id));
      removeProject(id);
  
      console.log(`Successfully deleted project with id ${id}`);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }
  
  function deleteMilestone(id) {
    fetch(`http://localhost:3000/milestones/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `${token}`,
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete milestone');
        }
        return response.json();
      })
      .then(data => {
        removeMilestone(id);
      })
      .catch(error => {
        console.error('Error deleting milestone:', error);
      });
  }

  

  function removeMilestone(id) {
    setMilestones(milestones.filter(p => p.project_id !== id));
  }

  function removeProject(id) {
    setProjects(projects.filter((p) => p.id !== id));
    setMilestones(milestones.filter((p) => p.project_id !== id));
  }

  return (
    <div>
      <Modal className='bootmodal' show={editFormOpen} onHide={hideEditForm}>
        <Modal.Body>
          <EditProject
            project={project}
            projects={projects}
            setProjects={setProjects}
            setMilestones={setMilestones}
            setEditFormOpen={setEditFormOpen}
          />
        </Modal.Body>
  </Modal>
  <h1>Projects</h1>
  <br />
  {projects === undefined && <h5>Nothing Here, Yet!</h5>}
  {projects.length === 0 && <h5>No projects (yet)</h5>}
  <ul>
    {projects.map((project) => {
      const projectMilestones = milestones.filter((m) => m.project_id === project.id);
      const daysRemaining = dayjs(project.due_date).diff(today, 'day');
      const isComplete = project.complete === true;
      const isSelected = selectedProjects.includes(project);
      const displayedProject = isSelected ? [project] : projects;
      const displayedMilestones = isSelected ? projectMilestones : milestones;

      return (
        <li key={project.id}>
          <Card className={`bootstrap_card ${isSelected ? 'clicked' : ''}`} onClick={() => showProject(project)}>
            {isComplete && <h5>complete</h5>}
            <div className='card-title'>
              <FaFlag onClick={() => console.log(project.id)} style={{ color: isComplete ? 'grey' : 'red' }} />
              <br />
              {project.name}
            </div>
            <div className='card-body'>
              {project.kind}
              <br />
              Deadline | {dayjs(project.due_date).format('MM.DD.YYYY')}
              <br />
              {!isComplete && `${daysRemaining} days remaining `}
              <br />
              <Button variant='primary' className='normal' onClick={() => showEditForm(project.id)}>
                edit
              </Button>
              <Button variant='danger' className='normal' onClick={() => confirmDeleteProject(project.id)}>
                delete
              </Button>
            </div>
          </Card>
          {isSelected && (
            <div>
              <h3>{project.name} Milestones</h3>
              <ul className='milestone-list'>
                {displayedMilestones.map((milestone) => (
                  <li key={milestone.id}>
                    <div className='bootstrap_card'>
                      <div className='card-title'>
                        <FaFlag style={{ color: 'red' }} />
                        <br />
                        {milestone.name}
                      </div>
                      <div className='card-body'>
                        {milestone.description}
                        <br />
                        Deadline | {dayjs(milestone.due_date).format('MM.DD.YYYY')}
                        <br />
                        {milestone.template === true && 'Template'}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      );
    })}
  </ul>
</div>
);
}

export default ProjectList;
