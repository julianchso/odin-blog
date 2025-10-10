import { NavLink } from 'react-router';

function Navbar() {
  return (
    <nav>
      <NavLink to='/' end>
        Home
      </NavLink>
      <NavLink to='/SignUp' end>
        Sign Up
      </NavLink>
      <NavLink to='/Login' end>
        Login
      </NavLink>
    </nav>
  );
}

export default Navbar;
