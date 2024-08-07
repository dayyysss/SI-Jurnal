// src/index.jsx
import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/protected/Dashboard'));
const DataUser = lazy(() => import('../pages/protected/Dashboard'));
const Welcome = lazy(() => import('../pages/protected/Welcome'));
const Page404 = lazy(() => import('../pages/protected/404'));
const Blank = lazy(() => import('../pages/protected/Blank'));
const Charts = lazy(() => import('../pages/protected/Charts'));
const Leads = lazy(() => import('../pages/protected/DataUser'));
const Integration = lazy(() => import('../pages/protected/Integration'));
const Calendar = lazy(() => import('../pages/protected/Calendar'));
const Team = lazy(() => import('../pages/protected/Team'));
const Transactions = lazy(() => import('../pages/protected/Transactions'));
const Bills = lazy(() => import('../pages/protected/Bills'));
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'));

const routes = [
  {
    path: '/dashboard', 
    component: Dashboard, 
  },
  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/dashboard-admin/integration',
    component: Integration,
  },
  {
    path: '/dashboard-admin/calendar',
    component: Calendar,
  },
  {
    path: '/dashboard-siswa/dashboard',
    component: Dashboard, 
  },
  {
    path: '/dashboard-siswa/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
];

export default routes;
