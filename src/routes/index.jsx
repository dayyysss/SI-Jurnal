// src/index.jsx
import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/protected/Dashboard'));
const Welcome = lazy(() => import('../pages/protected/Welcome'));
const Page404 = lazy(() => import('../pages/protected/404'));
const Blank = lazy(() => import('../pages/protected/Blank'));
const Charts = lazy(() => import('../pages/protected/Charts'));
const Leads = lazy(() => import('../pages/protected/Leads'));
const Integration = lazy(() => import('../pages/protected/Integration'));
const Calendar = lazy(() => import('../pages/protected/Calendar'));
const Team = lazy(() => import('../pages/protected/Team'));
const Transactions = lazy(() => import('../pages/protected/Transactions'));
const Bills = lazy(() => import('../pages/protected/Bills'));
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'));
const GettingStarted = lazy(() => import('../pages/GettingStarted'));
const DocFeatures = lazy(() => import('../pages/DocFeatures'));
const DocComponents = lazy(() => import('../pages/DocComponents'));

const routes = [
  {
    path: '/dashboard-admin/dashboard', 
    component: Dashboard, 
  },
  {
    path: '/dashboard-admin/welcome', 
    component: Welcome, 
  },
  {
    path: '/dashboard-admin/leads',
    component: Leads,
  },
  {
    path: '/dashboard-admin/settings-team',
    component: Team,
  },
  {
    path: '/dashboard-admin/calendar',
    component: Calendar,
  },
  {
    path: '/dashboard-admin/transactions',
    component: Transactions,
  },
  {
    path: '/dashboard-admin/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/dashboard-admin/settings-billing',
    component: Bills,
  },
  {
    path: '/dashboard-admin/getting-started',
    component: GettingStarted,
  },
  {
    path: '/dashboard-admin/features',
    component: DocFeatures,
  },
  {
    path: '/dashboard-admin/components',
    component: DocComponents,
  },
  {
    path: '/dashboard-admin/integration',
    component: Integration,
  },
  {
    path: '/dashboard-admin/charts',
    component: Charts,
  },
  {
    path: '/dashboard-admin/404',
    component: Page404,
  },
  {
    path: '/dashboard-admin/blank',
    component: Blank,
  },
];

export default routes;
