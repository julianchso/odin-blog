import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './styles/index.css';

import App from './App.tsx';
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import Main from './pages/MainPage.tsx';
import NewPostPage from './pages/NewPost.tsx';
import PostPages from './pages/PostsPage.tsx';
import { AuthProvider } from './components/AuthContext.tsx';
// import ProtectedRoute from './hooks/useProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Main /> },
      { path: 'SignUp', element: <SignUp /> },
      { path: 'Login', element: <Login /> },
      { path: 'NewPost', element: <NewPostPage /> },
      { path: 'Posts', element: <PostPages /> },
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
