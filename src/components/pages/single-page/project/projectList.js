import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import EditProject from './editProject';
import MilestoneForm from '../milestone/MilestoneForm';
import ProjectListItem from './projectListItem';

function ProjectList({ user, setUser, projects, setProjects, milestones, setMilestones }) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const [milestoneFormOpen, setMilestoneFormOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [project, setProject] = useState([]);
  const token = sessionStorage.token;

  const hideEditForm = () => {
    setEditFormOpen(false);
  };

  const hideMilestoneForm = () => {
    setMilestoneFormOpen(false);
  };

  function showProject(project) {
    if (selectedProject && selectedProject.id === project.id) {
      setSelectedProject(null);
      setMilestones(user.milestones.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)));
    } else {
      setSelectedProject(project);
      const projectMilestones = user.milestones.filter(m => m.project_id === project.id);
      projectMilestones.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)); // sort by due date
      setMilestones(projectMilestones);
  
      // Copy any changes made to milestones in `projectMilestones` to `user.milestones`
      const updatedMilestones = user.milestones.map(milestone => {
        const projectMilestone = projectMilestones.find(m => m.id === milestone.id);
        return projectMilestone ? projectMilestone : milestone;
      });
      setUser({ ...user, milestones: updatedMilestones });
    }
  }

  
  
  function unselectProject() {
    setSelectedProject(null);
    setMilestones(user.milestones.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)));
  }

const hideProject = () => { 
  setMilestones(user.milestones.sort((a, b) => new Date(a.due_date) - new Date(b.due_date)));
  setSelectedProject(null);
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
    try {
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
        removeMilestone(id);
        setUser({
          ...user,
          milestones: user.milestones.filter(m => m.id !== id),
        });
      })
      .catch(error => {
        console.error('Error deleting milestone:', error);
      });
    } catch (error) {
      console.error('Caught error in deleteMilestone:', error);
    }
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
  const showEditForm = (projectToEdit) => {
    setProject(projectToEdit);
    setEditFormOpen(true);
  };

return (
<div>
<Modal className='bootmodal' show={editFormOpen} onHide={hideEditForm}>
<Modal.Body>
<EditProject 
      user={user} 
      setUser={setUser} 
      project={project} 
      projects={projects} 
      setMilestones={setMilestones}
      setEditFormOpen={setEditFormOpen}
      setProjects={setProjects} 
      initialUser={user}
    />
</Modal.Body>
</Modal>
<Modal className='bootmodal' show={milestoneFormOpen} onHide={hideMilestoneForm}>
<Modal.Body>
<MilestoneForm user={user} setUser={setUser} project={project} milestones={setMilestones} setMilestones={setMilestones} hideMilestoneForm={hideMilestoneForm}/>
</Modal.Body>
</Modal>
<p className='headline'>Projects</p>

<br />
<ul>
{projects === undefined && <h5>Nothing Here, Yet!</h5>}
{projects.length === 0 && <h5>No projects (yet)</h5>}
    {projects.map((project) => (
      <ProjectListItem
        key={project.id}
        project={project}
        hideProject={hideProject}
        showProject={showProject}
        showEditForm={showEditForm}
        confirmDeleteProject={confirmDeleteProject}
        showMilestoneForm={showMilestoneForm}
        selectedProject={selectedProject}
      />
    ))}

  </ul>
</div>
);
}

export default ProjectList;