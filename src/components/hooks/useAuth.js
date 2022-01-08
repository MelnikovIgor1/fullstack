import { useHistory } from 'react-router-dom';

export function useAuth(setIsLogin, setError) {
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
