// import { Route } from 'react-router';
import { Outlet } from 'react-router';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='flex justify-center'>
      <div className='w-2/3 '>
        <Navbar />
        <Outlet />
        <h1>blog</h1>
      </div>
    </div>
  );
}

export default App;
