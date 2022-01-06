// import logo from './logo.svg';
import './App.css';
import React from 'react';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage, RegistrationPage } from './components/LoginPage';
import PersonalRoom from './components/PersonalRoom';
import ProjectsRoom from './components/ProjectsRoom';

import { ApiClientService } from './services/ApiClientService';

export function App() {
  const [user, setUser] = React.useState(null);
  const [isLogin, setIsLogin] = React.useState(
    window.localStorage.getItem('ACCESS')
  );

  const fetchUser = async () => {
    const user = await ApiClientService('user/current');
    setUser(user);
  };

  React.useEffect(() => {
    if (isLogin) {
      void fetchUser();
    }
  }, [isLogin]);

  console.log('TYPE: ', typeof setIsLogin);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/projects'>
            {isLogin ? <ProjectsRoom user={user} /> : <Redirect to='/login' />}
          </Route>
          <Route path='/room'>
            {isLogin ? <PersonalRoom user={user} /> : <Redirect to='/login' />}
          </Route>
          <Route path='/login'>
            <LoginPage isLogin={isLogin} setIsLogin={setIsLogin} />
          </Route>
          <Route path='/registration'>
            <RegistrationPage isLogin={isLogin} setIsLogin={setIsLogin} />
          </Route>
          <Route path='/'>
            {isLogin ? <Redirect to='/room' /> : <Redirect to='/login' />}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
