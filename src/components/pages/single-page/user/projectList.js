import React, { useEffect, useState } from 'react';

import { Card, Modal } from 'react-bootstrap';
import { FaFlag } from 'react-icons/fa';
import dayjs from 'dayjs';
import EditProject from '../project/editProject';

function projectList({ user, projects, setProjects, milestones, setMilestones, templates }) {
  const [project, setProject] = useState([]);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectProject, setSelectProject] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const today = dayjs();
  const token = sessionStorage.token;


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

  function removeProject(id) {
    let p_id = id;
      setProjects(projects.filter(p => p.id !== id));
      setMilestones(milestones.filter(p => p.project_id !== p_id));
    
  }

  function removeMilestone(id) {
    setMilestones(milestones.filter(p => p.project_id !== id));
  }

  const hideEditForm = () => {
    setEditFormOpen(false);
  };

  function showProject(project) {
    
    setSelectProject((current) => !current);
    
    
    if(selectProject) {
      setDisplayedProjects(projects.filter(p => p.id === project.id))
    let projectMilestones = milestones.filter(m => m.project_id === project.id)
    setMilestones(projectMilestones)
    console.log(projectMilestones)
    console.log(displayedProjects)
  }
    else {
      setMilestones(user.milestones)
      setDisplayedProjects([])
    }
  }

  const confirmDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const showEditForm = id => {
    const project = user.projects.find(p => p.id === id);
    setProject(project);
    setEditFormOpen(true);
  };

  useEffect(() => {
    console.log(project);
  }, []);
    return(

      <div>
  <Modal className='bootmodal' show={editFormOpen} onHide={hideEditForm}>
    <Modal.Body>
      <EditProject project={project} projects={projects} setProjects={setProjects} setMilestones={setMilestones}/>
    </Modal.Body>
  </Modal>
  <h1>Projects</h1>
  <br />
  <ul>
    {projects === 'undefined' && <h5>Nothing Here, Yet!</h5>}
    {projects.length === 0 && <h5>No projects (yet)</h5>}
   
      {projects.map((project) => (
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
          </div>
          </Card>
        </li>
      ))}
   
  </ul>

</div>
    )
}

export default projectList