import { useHistory } from 'react-router-dom';
import { apiBase } from '../../constants/keys';

export function useAuth(setIsLogin, setError) {
  console.log('useAuth');

  const history = useHistory();

  const onAuth = async (login, password) => {
    const response = await fetch(apiBase + 'token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        username: login,
        password,
      }),
    }).catch((err) => {
      console.log('problems', err);
      console.log(err);
    });

    console.log('response', response);
    const data = await response.json();

    if (response.status !== 200) {
      console.log(data);
      setError(data.detail);
    } else {
      setIsLogin(true);
      window.localStorage.setItem('ACCESS', data.access);
      window.localStorage.setItem('REFRESH', data.refresh);
      history.push('/');
    }
  };

  return { onAuth };
}
