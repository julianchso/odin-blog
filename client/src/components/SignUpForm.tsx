import React, { useState } from 'react';

import Input from './Input';
import Button from './Button';
import { useNavigate } from 'react-router';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:3000/api/auth/signup';
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

      navigate('/login');
    } catch (err) {
      console.error('Fetch error: ', err);
    }
  };

  return (
    <form className='boxForm' onSubmit={handleSignUp}>
      <label htmlFor='username'>
        Username:
        <Input
          id='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label htmlFor='password'>
        Password:
        <Input
          id='username'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label htmlFor='confirmPassword'>
        Retype Password:
        <Input
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <Button type='submit' size='md' color='primary'>
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
