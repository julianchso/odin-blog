import { NavLink, useNavigate } from 'react-router';

import { useAuth } from './AuthContext';

function LogInStatus() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (isLoggedIn) {
    return (
      <>
        <NavLink to='/newPost' end className='navButton'>
          New Post
        </NavLink>
        <button onClick={handleLogout} className='navButton'>
          Logout
        </button>
      </>
    );
  } else {
    return (
      <div>
        <NavLink to='/SignUp' end className='navButton'>
          Sign Up
        </NavLink>
        <NavLink to='/Login' end className='navButton'>
          Login
        </NavLink>
      </div>
    );
  }
}

function Navbar() {
  return (
    <div className='navContainer'>
      <nav className='flex justify-between'>
        <NavLink to='/' end className='navButton'>
          Home
        </NavLink>
        {LogInStatus()}
      </nav>
    </div>
  );
}

export default Navbar;
