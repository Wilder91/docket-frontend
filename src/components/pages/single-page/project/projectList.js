import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import EditProject from './editProject';
import MilestoneForm from '../milestone/MilestoneForm';
import ProjectListItem from './projectListItem';

function ProjectList({ user, projects, setProjects, milestones, setMilestones }) {
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [selectProject, setSelectProject] = useState(false);
  const [milestoneFormOpen, setMilestoneFormOpen] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [project, setProject] = useState([]);
  const token = sessionStorage.token;

  const hideEditForm = () => {
    setEditFormOpen(false);
  };

  const hideMilestoneForm = () => {
    setMilestoneFormOpen(false);
  };

  function showProject(project) {
    setSelectProject((current) => !current);
    if(!selectedProjects.includes(project)) {
      setSelectedProjects(selectedProjects=> [...selectedProjects, project]);
    }
    console.log(selectedProjects);
    if(selectProject) {
      setDisplayedProjects(projects.filter(p => p.id === project.id));
      let projectMilestones = milestones.filter(m => m.project_id === project.id);
      setMilestones(projectMilestones);
      console.log(projectMilestones);
      console.log(displayedProjects);
    }
    else {
      setMilestones(user.milestones);
      setDisplayedProjects([]);
    }
  }

  const confirmDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

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
Authorization: token,
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
  setMilestones(milestones.filter(m => m.id !== id));
}

function removeProject(id) {
setProjects(projects.filter((p) => p.id !== id));
setMilestones(milestones.filter((p) => p.project_id !== id));
}

const showMilestoneForm = project => {
setProject(project);
setMilestoneFormOpen(true);
};

const showEditForm = id => {
const project = user.projects.find(p => p.id === id);
setProject(project);
setEditFormOpen(true);
};

return (
<div>
<Modal className='bootmodal' show={editFormOpen} onHide={hideEditForm}>
<Modal.Body>
<EditProject project={project} projects={projects} setProjects={setProjects} setMilestones={setMilestones} setEditFormOpen={setEditFormOpen}/>
</Modal.Body>
</Modal>
<Modal className='bootmodal' show={milestoneFormOpen} onHide={hideMilestoneForm}>
<Modal.Body>
<MilestoneForm project={project} milestones={setMilestones} setMilestones={setMilestones}/>
</Modal.Body>
</Modal>
<h1>Projects</h1>
<br />
<ul>
{projects === undefined && <h5>Nothing Here, Yet!</h5>}
{projects.length === 0 && <h5>No projects (yet)</h5>}
    {projects.map((project) => (
      <ProjectListItem
        key={project.id}
        project={project}
        showProject={showProject}
        showEditForm={showEditForm}
        confirmDeleteProject={confirmDeleteProject}
        showMilestoneForm={showMilestoneForm}
      />
    ))}

  </ul>
</div>
);
}

export default ProjectList;