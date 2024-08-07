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
const Charts = lazy(() => import('../pages/dashboard/Charts'));
const Integration = lazy(() => import('../pages/dashboard/Integration'));
const Calendar = lazy(() => import('../pages/dashboard/Calendar'));
const Team = lazy(() => import('../pages/dashboard/Team'));
const Bills = lazy(() => import('../pages/dashboard/Bills'));
const ProfileSettings = lazy(() => import('../pages/dashboard/ProfileSettings'));

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const adminRoutes = [
    { path: '/dashboard-admin/dashboard', component: Dashboard, icon: <Squares2X2Icon className={iconClasses} />, name: 'Dashboard' },
    { path: '/dashboard-admin/data-user', component: DataUser, icon: <IdentificationIcon className={iconClasses} />, name: 'Data User' },
    { path: '/dashboard-admin/data-sekolah', component: DataSekolah, icon: <BuildingOffice2Icon className={iconClasses} />, name: 'Data Sekolah' },
    { path: '/dashboard-admin/jurnal', component: Charts, icon: <PencilSquareIcon className={iconClasses} />, name: 'Jurnal' },
    { path: '/dashboard-admin/blog', component: Integration, icon: <NewspaperIcon className={iconClasses} />, name: 'Blog' },
    { path: '/dashboard-admin/calendar', component: Calendar, icon: <CalendarDaysIcon className={iconClasses} />, name: 'Kalender' },
    {
        path: '', icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, name: 'Konfigurasi', submenu: [
            { path: '/dashboard-admin/settings-profile', component: ProfileSettings, icon: <UserIcon className={iconClasses} />, name: 'Roles' },
            { path: '/dashboard-admin/settings-billing', component: Bills, icon: <WalletIcon className={iconClasses} />, name: 'Permission' },
            { path: '/dashboard-admin/settings-team', component: Team, icon: <UsersIcon className={iconClasses} />, name: 'Team Members' },
        ]
    }
];

export default adminRoutes;