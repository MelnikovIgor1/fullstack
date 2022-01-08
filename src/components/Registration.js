import React from 'react';
import { useAuth } from './hooks/useAuth';
import { useHistory } from 'react-router-dom';

export default function Registration(props) {
  const history = useHistory();
  const { setIsLogin } = props;
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { onAuth } = useAuth(setIsLogin, setError);

  React.useEffect(() => {
    if (error) {
      setError('');
    }
  }, [login, password, email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!login) {
      setError('Enter Login');

      return;
    }

    if (!password) {
      setError('Enter Password');

      return;
    }

    if (!email) {
      setError('Enter email');

      return;
    }

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
    console.log('data', data, response);

    if (response.statusText !== 'Created') {
      setError(data.email);
    } else {
      await onAuth(login, password);
    }
  };

  return (
    <div className='login_form'>
      <form>
        <div>
          <label>Login</label>
          <input
            type='text'
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <div className='login_form__error'>{error}</div>
        <button type='submit' onClick={handleSubmit}>
          Sign Up
        </button>
        <button
          type='submit'
          onClick={() => {
            history.push('/login');
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
