import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import SignUp from './pages/SignUp.tsx';
import './styles/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'SignUp', element: <SignUp /> },
      { path: 'Login', element: <Login /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
