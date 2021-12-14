export async function ApiClientService(url) {
  const response = await fetch(`http://localhost:8000/api/${url}`);
  const data = await response.json();

  return data;
}
