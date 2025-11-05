import React from 'react';

// import { fetchWithAuth } from '../services/auth';
import Button from './Button';

function PostForm() {
  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    // const data = await fetchWithAuth('http://localhost:3000/api/posts');
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error(`token not found`);
    }

    try {
      const url = 'http://localhost:3000/api/posts';
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className='boxForm' onSubmit={handlePost}>
      <Button type='submit' size='md' color='primary'>
        Post Get
      </Button>
    </form>
  );
}

export default PostForm;
