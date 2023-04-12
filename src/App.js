import React from 'react';
import { BrowserRouter, Route, Routes,  } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/login';
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
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/' element={<Home />} />               
          <Route exact path ='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default App;