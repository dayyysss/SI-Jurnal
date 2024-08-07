import { Squares2X2Icon, PencilSquareIcon } from '@heroicons/react/24/outline';
import React, { lazy, useEffect, Suspense, useState } from 'react';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const DataUser = lazy(() => import('../pages/dashboard/DataUser'));
const DataSekolah = lazy(() => import('../pages/dashboard/DataSekolah'));
const Page404 = lazy(() => import('../pages/dashboard/404'));
const Blank = lazy(() => import('../pages/dashboard/Blank'));
const Charts = lazy(() => import('../pages/dashboard/Charts'));
const Integration = lazy(() => import('../pages/dashboard/Integration'));
const Calendar = lazy(() => import('../pages/dashboard/Calendar'));
const Team = lazy(() => import('../pages/dashboard/Team'));
const Bills = lazy(() => import('../pages/dashboard/Bills'));
const ProfileSettings = lazy(() => import('../pages/dashboard/ProfileSettings'));

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const siswaRoutes = [
    { path: '/dashboard-siswa/dashboard',component: Dashboard, icon: <Squares2X2Icon className={iconClasses} />, name: 'Dashboard' },
    { path: '/dashboard-siswa/jurnal', icon: <PencilSquareIcon className={iconClasses} />, name: 'Jurnal' },
];

export default siswaRoutes;