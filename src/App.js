import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Landing from './components/pages/login';
import ProjectForm from './components/pages/projectForm';
import Projects from './components/pages/projects';
import Milestones from './components/pages/milestones';
import AddProject from './components/pages/add-project'
import Project from './components/pages/project';
import Signup from './components/pages/signup';
import Mike from './components/pages/add-milestone';
import User from './components/pages/user';
import Logout from './components/pages/logout';


const App = () => {
  return (
    <>
      <BrowserRouter >
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/milestones' element={<Milestones />} />
        <Route exact path='/project' element={<ProjectForm />} />
        <Route exact path='/addproject' element={<AddProject />} />
        <Route exact path='/projects' element={<Projects />} />
        <Route exact path='/projects/:projectId' element={<Project />} />
        <Route exact path='/projects/:projectId/addmilestone' element={<Mike />} />
        <Route exact path='/user' element={<User />} />
        <Route exact path ='/logout' element={<Logout />} />
 

        </Routes>
       
      </BrowserRouter>
    </>
  );
};

export default App;