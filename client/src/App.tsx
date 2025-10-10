// import { Route } from 'react-router';
import { Outlet } from 'react-router';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <h1>blog</h1>
      <LoginForm />
    </>
  );
}

export default App;
