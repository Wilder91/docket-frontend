import React, { useState } from 'react';
import { Modal, Container } from 'react-bootstrap';
import EditProject from './editProject';
import MilestoneForm from '../milestone/MilestoneForm';
import ProjectListItem from './projectListItem';

function ProjectList({ user, setUser, projects, setProjects, milestones, setMilestones }) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const [milestoneFormOpen, setMilestoneFormOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
 
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

  async function deleteMilestone(id) {
    try {
      const response = await fetch(`http://localhost:3000/milestones/${id}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: token,
        })
      });
      if (!response.ok) {
        throw new Error(`Failed to delete milestone with ID ${id}. Response status: ${response.status} ${response.statusText}`);
      }
  
      await new Promise((resolve) => {
        setMilestones(prevMilestones => {
          const filteredMilestones = prevMilestones.filter(m => m.id !== id);
          setUser({
            ...user,
            milestones: user.milestones.filter(m => m.id !== id),
          });
          resolve(filteredMilestones);
          return filteredMilestones;
        });
      });
  
      removeMilestone(id);
    } catch (error) {
      console.error(`Error deleting milestone with ID ${id}: ${error.message}`);
      console.error(error.stack);
      
    }
   
  }
  function removeMilestone(id) {
    setMilestones(milestones.filter(m => m.id !== id));
    
  }

  function removeProject(id) {
    setUser(prevUser => {
      const updatedProjects = prevUser.projects.filter((p) => p.id !== id);
      const updatedMilestones = prevUser.milestones.filter((m) => m.project_id !== id);
      return {
        ...prevUser,
        projects: updatedProjects,
        milestones: updatedMilestones
      };
    });
    setProjects(projects.filter((p) => p.id !== id));
    setMilestones(milestones.filter((m) => m.project_id !== id));
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



  



{projects.length === 0 && <h5>No projects (yet)</h5>}
<Container className='projects-container'>
<div className='list'>
  
<ul>
    {projects.map((project) => (
      <ProjectListItem
        key={project.id}
        project={project}
        milestones={milestones}
        hideProject={hideProject}
        showProject={showProject}
        showEditForm={showEditForm}
        confirmDeleteProject={confirmDeleteProject}
        showMilestoneForm={showMilestoneForm}
        selectedProject={selectedProject}
      />
    ))}
  <br />
  </ul>
  </div>
  </Container>
</div>

);
}

export default ProjectList;