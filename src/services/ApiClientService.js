// const apiBase = 'http://localhost:8000/api/';
import { apiBase } from '../constants/keys';

export async function ApiClientService(url, options = {}) {
  const access = window.localStorage.getItem('ACCESS');
  const headers = options.headers || {};
  if (access) {
    headers['Authorization'] = `Bearer ${access}`;
  }

  console.log('SENT API', url, { ...options, headers });
  let response = await fetch(`${apiBase}${url}`, { ...options, headers });
  console.log('API', url, response);

  if (response.status === 204) {
    console.log('BIBA');
    return null;
  }

  if (response.status === 401) {
    const refresh = window.localStorage.getItem('REFRESH');
    const refreshResponse = await fetch(`${apiBase}token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        refresh,
      }),
    });
    const refreshData = await refreshResponse.json();

    window.localStorage.setItem('ACCESS', refreshData.access);

    headers['Authorization'] = `Bearer ${refreshData.access}`;

    response = await fetch(`${apiBase}${url}`, { ...options, headers });
  }

  const data = await response.json();

  return data;
}
