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
    return <button onClick={handleLogout}>Logout</button>;
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
