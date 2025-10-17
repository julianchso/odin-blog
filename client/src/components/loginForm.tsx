import Input from './Input';
import Button from './Button';

function LoginForm() {
  return (
    <div className='boxForm'>
      <label htmlFor='username'>
        Username:
        <Input id='username' />
      </label>
      <label htmlFor='password'>
        Password:
        <Input />
      </label>
      <Button type='submit' size='md' color='primary'>
        Log In
      </Button>
    </div>
  );
}

export default LoginForm;
