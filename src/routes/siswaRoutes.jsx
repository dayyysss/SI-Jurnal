import React, { lazy, useEffect, Suspense, useState } from 'react';
import {
    Squares2X2Icon, IdentificationIcon, BuildingOffice2Icon, PencilSquareIcon,
    NewspaperIcon, CalendarDaysIcon, Cog6ToothIcon, UserIcon, WalletIcon, UsersIcon
} from '@heroicons/react/24/outline';

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

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const siswaRoutes = [
    { path: '/dashboard-siswa/dashboard', component: Dashboard, icon: <Squares2X2Icon className={iconClasses} />, name: 'Dashboard' },
    { path: '/dashboard-siswa/data-sekolah', component: DataSekolah, icon: <BuildingOffice2Icon className={iconClasses} />, name: 'Data Sekolah' },
    { path: '/dashboard-siswa/jurnal', component: Charts, icon: <PencilSquareIcon className={iconClasses} />, name: 'Jurnal' },
    { path: '/dashboard-siswa/data-user', component: DataUser, icon: <IdentificationIcon className={iconClasses} />, name: 'Data User' },
    { path: '/dashboard-siswa/blog', component: Blog, icon: <NewspaperIcon className={iconClasses} />, name: 'Blog' },
    { path: '/dashboard-siswa/timeline', component: Timeline, icon: <CalendarDaysIcon className={iconClasses} />, name: 'Timeline' },
];

export default siswaRoutes;