import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import MainPage from './components/MainPage';

import PersonalPosts from './components/PersonalPage';
import { Updater } from './components/Updater';

import Login from './components/Login';
import Registration from './components/Registration';

import { ApiClientService } from './services/ApiClientService';

export function App() {
  const [user, setUser] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(
    window.localStorage.getItem('ACCESS')
  );

  const fetchUser = async () => {
    console.log('SENT');
    const user = await ApiClientService('user/current');
    console.log('USERR  ');
    setUser(user);
  };

  console.log('MAIN USER', user);

  React.useEffect(() => {
    if (isLogin) {
      void fetchUser();
    }
  }, [isLogin]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/projects'>
            {isLogin ? (
              <PersonalPosts
                user={user}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/login'>
            <Login setIsLogin={setIsLogin} />
          </Route>
          <Route path='/registration'>
            <Registration setIsLogin={setIsLogin} />
          </Route>
          <Route path='/logout'>
            <Redirect to='/' />
          </Route>
          <Route path='/post/:postId'>
            <Updater isLogin={isLogin} user={user} />
          </Route>
          <Route path='/'>
            {isLogin ? (
              <MainPage user={user} isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
