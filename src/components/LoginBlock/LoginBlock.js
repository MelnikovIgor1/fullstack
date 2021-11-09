import React from 'react';

import './loginBlock.css';

import { Redirect } from 'react-router-dom';
// import { combineReducers } from 'redux';

export function LoginBlock() {
  const buttonTitle = 'Submit';

  const defaultLogin = '';
  const defaultPassword = '';
  const defaultAge = '';
  const [login, setLogin] = React.useState(defaultLogin);
  const [password, setPassword] = React.useState(defaultPassword);
  const [age, setAge] = React.useState(defaultAge);

  const [isSigningUp, setIsSigningUp] = React.useState(false);
  let [redirect, setRedirect] = React.useState(false);

  if (redirect) {
    redirect = false;
    return <Redirect to='/room/' />;
  }

  return (
    <div className='wrapper_login'>
      <form>
        <div>
          <label>Title</label>
          <input
            name='login'
            type='text'
            value={login}
            onChange={(event) => {
              setLogin(event.target.value);
            }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name='description'
            type='text'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {isSigningUp && (
          <div>
            <label>Age</label>
            <input
              name='age'
              type='text'
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>
        )}
        <button
          type='submit'
          onClick={(el) => {
            el.preventDefault();
            el.stopPropagation();
            const user = {
              login,
              password,
              age,
            };
            if (isSigningUp) {
              fetch('http://localhost:3000/users', {
                headers: {
                  'Content-Type': 'Application/json',
                },
                body: JSON.stringify(user),
                method: 'POST',
              });
            }

            localStorage.setItem('user', login);
            setIsSigningUp(isSigningUp);

            setRedirect(true);
          }}
        >
          {buttonTitle}
        </button>
      </form>
      {isSigningUp ? (
        <button onClick={() => setIsSigningUp(false)}>Log in</button>
      ) : (
        <button onClick={() => setIsSigningUp(true)}>Sign up</button>
      )}
    </div>
  );
}
