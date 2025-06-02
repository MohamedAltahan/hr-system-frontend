// routes/index.jsx
import { authRoutes } from './AuthRoutes';
import { appRoutes } from './AppRoutes';
import Landing from '../pages/Landing/Landing';

export const routes = [
  { path: '/', element: <Landing /> },
  ...authRoutes,
  ...appRoutes,
];
