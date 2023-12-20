import React from 'react';

import { BrowserRouter, Route, Routes,  } from 'react-router-dom';

import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Home from './components/pages/single-page/HomePage';
import Logout from './components/pages/logout';
import { UserContext } from './components/pages/single-page/util/context';
import { GoogleOAuthProvider } from '@react-oauth/google';




const App = () => {
  
  return (
    <div>
    <GoogleOAuthProvider clientId="494043831138-f2m2q99nb0if9m034el6vp645n9sffsn.apps.googleusercontent.com">
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
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;