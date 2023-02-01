import React from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import './App.css';

import Landing from './components/pages/login';


import Project from './components/pages/single-page/project/Project';
import Signup from './components/pages/signup';

import User from './components/pages/single-page/HomePage';
import Logout from './components/pages/logout';




const App = () => {
  return (
    <>
      <BrowserRouter >
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/signup' element={<Signup />} />


        <Route exact path='/projects/:projectId' element={<Project />} />
 
        <Route exact path='/home' element={<User />} />
        <Route exact path ='/logout' element={<Logout />} />
 

        </Routes>
       
      </BrowserRouter>
    </>
  );
};

export default App;