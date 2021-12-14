import React from 'react';

import './loginBlock.css';

// import { Redirect } from 'react-router-dom';
// import { combineReducers } from 'redux';

export function LoginBlock() {
  const buttonTitle = 'Submit';

  const defaultLogin = '';
  const defaultPassword = '';
  const defaultAge = '';
  const [login, setLogin] = React.useState(defaultLogin);
  const [password, setPassword] = React.useState(defaultPassword);
  const [age, setAge] = React.useState(defaultAge);
  const [error, setError] = React.useState('');
  const fileRef = React.useRef();

  const [isSigningUp, setIsSigningUp] = React.useState(false);
  // let [redirect, setRedirect] = React.useState(false);

  // if (redirect) {
  //   redirect = false;
  //   return <Redirect to='/room/' />;
  // }

  // const validateSubmission = () => {
  //   return login.length > 0 && password.length > 0 && age.length > 0;
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length == 0) {
      setError('Enter password');
      return;
    }

    if (login.length == 0) {
      setError('Enter login');
      return;
    }
    console.log(login, password);

    if (isSigningUp) {
      try {
        const response = await fetch('http://localhost:8000/api/token/', {
          // mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
          },
          body: JSON.stringify({ username: login, password }),
        });
        const data = await response.json();
        console.log(response);
        if (response.method !== 200) {
          setError(data.detail);
        }

        window.localStorage.setItem('ACCESS', data.access);
        window.localStorage.setItem('REFRESH', data.refresh);
      } catch (err) {
        setError(err.detail);
      }
    } else {
      try {
        const response = await fetch('http://localhost:8000/api/signup/', {
          // mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
          },
          body: JSON.stringify({
            username: login,
            password,
            age,
            image: fileRef.current,
          }),
        });
        const data = await response.json();
        console.log(response);
        if (response.method !== 200) {
          setError(data.detail);
        }

        window.localStorage.setItem('ACCESS', data.access);
        window.localStorage.setItem('REFRESH', data.refresh);
      } catch (err) {
        setError(err.detail);
      }
    }
  };

  React.useEffect(() => {
    if (error) {
      setError('');
    }
  }, [login, password]);

  return (
    <div className='wrapper_login'>
      <form style={{ width: '200px' }}>
        <div>
          <label className='from_label'>Title</label>
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
          <label className='from_label'>Password</label>
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
          <>
            <div>
              <label className='from_label'>Age</label>
              <input
                name='age'
                type='text'
                value={age}
                onChange={(event) => {
                  setAge(event.target.value);
                }}
              />
            </div>
            <div>
              <label>CV</label>
              <input type='file' ref={fileRef.current}></input>
            </div>
          </>
        )}
        <div className='login_form_error'>{error}</div>
        <button
          className='submit_button'
          type='submit'
          onClick={handleSubmit}
          //   {
          //     (el) => {
          //     el.preventDefault();
          //     el.stopPropagation();
          //     if (!validateSubmission()) {
          //       return;
          //     }
          //     const user = {
          //       login,
          //       password,
          //       age,
          //     };
          //     if (isSigningUp) {
          //       fetch('http://localhost:3000/users', {
          //         headers: {
          //           'Content-Type': 'Application/json',
          //         },
          //         body: JSON.stringify(user),
          //         method: 'POST',
          //       });
          //     }

          //     localStorage.setItem('user', login);
          //     setIsSigningUp(isSigningUp);

          //     setRedirect(true);
          //   }
          // }
        >
          {buttonTitle}
        </button>

        {isSigningUp ? (
          <button
            className='submit_button'
            onClick={(el) => {
              el.preventDefault();
              setIsSigningUp(false);
            }}
          >
            Log in
          </button>
        ) : (
          <button
            className='submit_button'
            onClick={(el) => {
              el.preventDefault();
              setIsSigningUp(true);
            }}
          >
            Sign up
          </button>
        )}
      </form>
    </div>
  );
}
