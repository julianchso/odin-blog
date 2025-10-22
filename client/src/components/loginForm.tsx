import React, { useState } from 'react';

import Input from './Input';
import Button from './Button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogIn = async (e: React.FormEvent) => {
    console.log('login click');
    e.preventDefault();

    try {
      const url = 'http://localhost:3000/api/auth/login';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className='boxForm' onSubmit={handleLogIn}>
      <label htmlFor='username'>
        Username:
        <Input
          id='username'
          type='text'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
      <label htmlFor='password'>
        Password:
        <Input
          id='password'
          type='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
      <Button type='submit' size='md' color='primary'>
        Log In
      </Button>
    </form>
  );
}

export default LoginForm;
