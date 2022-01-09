import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

export default function Login(props) {
  const history = useHistory();
  const { setIsLogin } = props;
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  // const history = useHistory();
  const { onAuth } = useAuth(setIsLogin, setError);

  React.useEffect(() => {
    if (error) {
      setError('');
    }
  }, [login, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!login) {
      setError('Enter login');

      return;
    }

    if (!password) {
      setError('Enter password');

      return;
    }

    console.log('LOGIN');
    await onAuth(login, password);
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
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
        </div>
        <div className='login_form__error'>{error}</div>
        <button type='submit' onClick={handleSubmit}>
          Sign in
        </button>
        <button type='submit' onClick={() => history.push('/registration')}>
          Sign up
        </button>
      </form>
    </div>
  );
}
