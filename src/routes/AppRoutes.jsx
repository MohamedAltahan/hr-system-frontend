// routes/AppRoutes.jsx
import { lazy } from 'react';
import AppLayout from '../components/layout/AppLayout';
import AuthGuard from '../utilities/AuthGuard';
import Dashboard from '../pages/Dashboard/Dashboard';
import Maintenence from '../components/Maintenence';
import Tenants from '../pages/Tenants/tenants';
import AddTenant from '../pages/Tenants/add';
import Staff from '../pages/Users/users';
import AddUser from '../pages/Users/add';
import EditUser from '../pages/Users/edit/[id]';
import ShowUser from '../pages/Users/[id]';
// import other pages...

export const appRoutes = [
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        ),
      },
      {
        path: 'users',
        children: [
          { index: true, element: <AuthGuard><Staff /></AuthGuard> },
          { path: 'add', element: <AuthGuard><AddUser /></AuthGuard> },
          { path: 'edit/:id', element: <AuthGuard><EditUser /></AuthGuard> },
          { path: ':id', element: <AuthGuard><ShowUser /></AuthGuard> },
        ],
      },
      {
        path: 'tenant',
        children: [
          { index: true, element: <AuthGuard><Tenants /></AuthGuard> },
          { path: 'add', element: <AuthGuard><AddTenant /></AuthGuard> },
        ],
      },
      // Add more sections like "branch", "plans", etc. here
    ],
  },
  { path: '*', element: <Maintenence /> },
];
