import { NavLink } from 'react-router';
import { useState } from 'react';

function LogInStatus() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return <NavLink to='LogOut'>Logout</NavLink>;
  } else {
    return (
      <div>
        <NavLink to='/SignUp' end>
          Sign Up
        </NavLink>
        <NavLink to='/Login' end>
          Login
        </NavLink>
      </div>
    );
  }
}

function Navbar() {
  return (
    <div>
      <nav className='flex justify-between'>
        <NavLink to='/' end>
          Home
        </NavLink>
        {LogInStatus()}
      </nav>
    </div>
  );
}

export default Navbar;
