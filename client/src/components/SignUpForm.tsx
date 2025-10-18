import React, { useState } from 'react';

import Input from './Input';
import Button from './Button';
import { useNavigate } from 'react-router';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.FormEvent) => {
    setUsername((e.target as HTMLInputElement).value);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    setPassword((e.target as HTMLInputElement).value);
  };

  const handleConfirmPasswordChange = (e: React.FormEvent) => {
    setConfirmPassword((e.target as HTMLInputElement).value);
  };

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
    <form className='boxForm'>
      <label htmlFor='username'>
        Username:
        <Input id='username' value={username} onChange={handleUsernameChange} />
      </label>
      <label htmlFor='password'>
        Password:
        <Input id='password' value={password} onChange={handlePasswordChange} />
      </label>
      <label htmlFor='confirmPassword'>
        Retype Password:
        <Input
          id='confirmPassword'
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      </label>
      <Button type='submit' size='md' color='primary' onClick={handleSignUp}>
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
