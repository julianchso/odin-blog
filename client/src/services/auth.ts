export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('jwt');
  console.log(`fetchWithAuth: ${token}`);

  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    throw new Error('Unauthorized or network error');
  }

  const data = await res.json();

  console.log(data);

  return data;
}
