// src/index.jsx
import { lazy } from 'react';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const DataUser = lazy(() => import('../pages/dashboard/DataUser'));
const DataSekolah = lazy(() => import('../pages/dashboard/DataSekolah'));
const Page404 = lazy(() => import('../pages/dashboard/404'));
const Blank = lazy(() => import('../pages/dashboard/Blank'));
const Charts = lazy(() => import('../pages/dashboard/Jurnal'));
const Blog = lazy(() => import('../pages/dashboard/Blog'));
const Timeline = lazy(() => import('../pages/dashboard/Timeline'));
const Team = lazy(() => import('../pages/dashboard/Team'));
const Bills = lazy(() => import('../pages/dashboard/Bills'));
const ProfileSettings = lazy(() => import('../pages/dashboard/ProfileSettings'));

const routes = [
  {
    path: '/dashboard', 
    component: Dashboard, 
  },
  {
    path: '/data-user',
    component: DataUser,
  },
  {
    path: '/data-sekolah',
    component: DataSekolah,
  },
  {
    path: '/jurnal',
    component: Charts,
  },
  {
    path: '/blog',
    component: Blog,
  },
  {
    path: '/timeline',
    component: Timeline,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/settings-team',
    component: Team,
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
