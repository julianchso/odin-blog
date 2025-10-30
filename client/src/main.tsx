import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.css';

import App from './App.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import SignUp from './pages/SignUp.tsx';
import PostPage from './pages/PostPage.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
import ProtectedRoute from './hooks/useProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'SignUp', element: <SignUp /> },
      { path: 'Login', element: <Login /> },
      {
        path: 'posts',
        element: (
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
