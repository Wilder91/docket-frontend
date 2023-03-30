import React from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/login';
import addTemplate from './components/pages/single-page/templates/addTemplate'
import Templates from './components/pages/single-page/templates/templates'
import Project from './components/pages/single-page/project/Project';
import Signup from './components/pages/signup';

import Home from './components/pages/single-page/HomePage';
import Logout from './components/pages/logout';
import { UserContext } from './components/pages/single-page/util/context';





const App = () => {
 
  return (
    <>
      <UserContext.Provider value={'hello'}>
      <BrowserRouter >
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/home' element={<Home />} />               
          <Route exact path='/projects/:projectId' element={<Project />} />   
          <Route exact path='/templates' element={<Templates />} />   
          <Route exact path ='/logout' element={<Logout />} />
          <Route exact path='/editproject' element={<editProject />} />
          <Route exact path='/addtemplate' element={<addTemplate />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default App;