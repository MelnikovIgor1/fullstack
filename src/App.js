// import logo from './logo.svg';
import './App.css';
import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PersonalRoom from './components/PersonalRoom';
import ProjectsRoom from './components/ProjectsRoom';

export function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/projects'>
            <ProjectsRoom />
          </Route>
          <Route path='/room'>
            <PersonalRoom />
          </Route>
          <Route path='/'>
            <LoginPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
