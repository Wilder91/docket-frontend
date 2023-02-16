import React from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';


import Landing from './components/pages/login';

import Templates from './components/pages/templates/index.js'
import Project from './components/pages/single-page/project/Project';
import Signup from './components/pages/signup';

import Home from './components/pages/single-page/HomePage';
import Logout from './components/pages/logout';




const App = () => {
  return (
    <>
      <BrowserRouter >
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/home' element={<Home />} />               
          <Route exact path='/projects/:projectId' element={<Project />} />   
          <Route exact path='/templates' element={<Templates />} />   
          <Route exact path ='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;