import React from 'react';
// import { useAuth } from './hooks';
import { useHistory } from 'react-router-dom';

export default function useAuth(setIsLogin, setError) {
  const history = useHistory();

  const onAuth = async (login, password) => {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        username: login,
        password,
      }),
    });
    const data = await response.json();

    if (response.method !== 200) {
      setError(data.detail);
    }
    setIsLogin(true);
    window.localStorage.setItem('ACCESS', data.access);
    window.localStorage.setItem('REFRESH', data.refresh);
    history.push('/');
  };

  return { onAuth };
}

import './loginBlock.css';
// import {
// ApiClientService,
// ApiRawRequest,
// } from '../../services/ApiClientService';
// import { useHistory } from 'react-router-dom';

// import { Redirect } from 'react-router-dom';
// import { ApiClientService } from '../../services/ApiClientService';
// import { combineReducers } from 'redux';
export function LoginBlock(props) {
  const { setIsLogin } = props;
  const buttonTitle = 'Submit';

  const defaultLogin = '';
  const defaultPassword = '';
  const [login, setLogin] = React.useState(defaultLogin);
  const [password, setPassword] = React.useState(defaultPassword);
  const [error, setError] = React.useState('');
  const { onAuth } = useAuth(setIsLogin, setError);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onAuth(login, password);
    } catch (err) {
      console.log(err);
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
        <div className='login_form_error'>{error}</div>
        <button className='submit_button' type='submit' onClick={handleSubmit}>
          {buttonTitle}
        </button>
        <button type='submit' onClick={() => history.push('/registration')}>
          Sign up
        </button>
      </form>
    </div>
  );
}

export function RegistrationBlock(props) {
  const { setIsLogin } = props;
  const buttonTitle = 'Submit';

  const defaultLogin = '';
  const defaultPassword = '';
  const [login, setLogin] = React.useState(defaultLogin);
  const [password, setPassword] = React.useState(defaultPassword);
  const [email, setEmail] = React.useState(defaultPassword);
  const [error, setError] = React.useState('');
  const { onAuth } = useAuth(setIsLogin, setError);

  const history = useHistory();

  const dataCheck = async () => {
    if (!login) {
      setError('Поле логин не должно быть пустым');

      return;
    }

    if (!password) {
      setError('Поле пароль не должно быть пустым');

      return;
    }

    if (!email) {
      setError('Поле email не должно быть пустым');

      return;
    }
  };

  const formData = async () => {
    const response = await fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        username: login,
        password,
        email,
      }),
    });

    const data = await response.json();

    if (response.method !== 200) {
      setError(data.detail);
    }

    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dataCheck();
    await formData();
    await onAuth(login, password);
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
        <div>
          <label className='from_label'>Email</label>
          <input
            name='description'
            type='text'
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className='login_form_error'>{error}</div>
        <button className='submit_button' type='submit' onClick={handleSubmit}>
          {buttonTitle}
        </button>
        <button type='submit' onClick={() => history.push('/login')}>
          Sign in
        </button>
      </form>
    </div>
  );
}

/*
export function LoginBlock() {
  let [redirect, setRedirect] = React.useState(false);

  if (redirect) {
    redirect = false;
    return <Redirect to='/room/' />;
  }

  const [isSigningUp, setIsSigningUp] = React.useState(false);

  const buttonTitle = 'Submit';

  const defaultLogin = '';
  const defaultPassword = '';
  const defaultAge = '';
  const [login, setLogin] = React.useState(defaultLogin);
  const [password, setPassword] = React.useState(defaultPassword);
  const [age, setAge] = React.useState(defaultAge);
  const [error, setError] = React.useState('');
  const fileRef = React.useRef();
  const history = useHistory();

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
    console.log('login, password', login, password);

    const LoginFunc = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json',
          },
          body: JSON.stringify({ username: login, password }),
        });
        const data = await response.json();
        console.log('LoginFunc-response', response);
        if (response.method !== 200) {
          setError(data.detail);
        }

        window.localStorage.setItem('ACCESS', data.access);
        window.localStorage.setItem('REFRESH', data.refresh);
        localStorage.setItem('user', login);
        localStorage.setItem(
          'user_id',
          (await ApiClientService('user/current'))['id']
        );
        // setRedirect(true);
        // setIsSigningUp(isSigningUp);
        history.push('/room/');
      } catch (err) {
        setError(err.detail);
      }
    };

    if (!isSigningUp) {
      await LoginFunc();
    } else {
      try {
        console.log(fileRef.current.files[0]);
        const formData = new FormData();
        const post = {
          username: login,
          password,
          age,
          // file: '',
          file: fileRef.current.files[0],
        };
        for (let postKey in post) {
          formData.append(postKey, post[postKey]);
        }
        const response = await fetch('http://localhost:8000/api/usersdata/', {
          method: 'POST',
          body: formData,
        });
        console.log(response);

        await LoginFunc();
        // localStorage.setItem('user', login);
        // history.push('/room/');
      } catch (err) {
        setError(err.detail);
      }
      // console.log('here');
    }
    setRedirect(true);
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
              <input type='file' ref={fileRef}></input>
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
*/
