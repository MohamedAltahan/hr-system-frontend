// routes/AuthRoutes.jsx
import Login from '../pages/Auth/Login';
import CheckEmail from '../pages/Auth/checkEmail';
import ResetPassword from '../pages/Auth/resetPasswrod';
import LoginGuard from '../utilities/LoginGuard';

export const authRoutes = [
  {
    path: '/login',
    element: (
      <LoginGuard>
        <Login />
      </LoginGuard>
    ),
  },
  {
    path: '/CheckEmail',
    element: (
      <LoginGuard>
        <CheckEmail />
      </LoginGuard>
    ),
  },
  {
    path: '/ResetPassword',
    element: (
      <LoginGuard>
        <ResetPassword />
      </LoginGuard>
    ),
  },
];
