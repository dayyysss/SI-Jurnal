import React from 'react';
import Cookies from 'js-cookie';
import {
  BuildingOffice2Icon, PencilSquareIcon, IdentificationIcon, DocumentDuplicateIcon,
  KeyIcon, UsersIcon, BoltIcon, Cog6ToothIcon, UserIcon, ArrowRightOnRectangleIcon,
  CalendarDaysIcon, ExclamationTriangleIcon, DocumentIcon, CodeBracketSquareIcon, 
  WalletIcon, TableCellsIcon, Squares2X2Icon, DocumentTextIcon, BellIcon, NewspaperIcon
} from '@heroicons/react/24/outline';

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
    {
      path: '/dashboard',
      icon: <Squares2X2Icon className={iconClasses} />,
      name: 'Dashboard',
    },
    {
      path: '/data-user',
      icon: <IdentificationIcon className={iconClasses} />,
      name: 'Data User',
    },
    {
      path: '/data-sekolah',
      icon: <BuildingOffice2Icon className={iconClasses} />,
      name: 'Data Sekolah',
    },
    {
      path: '/charts',
      icon: <PencilSquareIcon className={iconClasses} />,
      name: 'Jurnal',
    },
    {
      path: '/dashboard-admin/integration',
      icon: <NewspaperIcon className={iconClasses} />,
      name: 'Blog',
    },
    {
      path: '/dashboard-admin/calendar',
      icon: <CalendarDaysIcon className={iconClasses} />,
      name: 'Calendar',
    },
    {
      path: '',
      icon: <Cog6ToothIcon className={`${iconClasses} inline`} />,
      name: 'Settings',
      submenu: [
        {
          path: '/dashboard-admin/settings-profile',
          icon: <UserIcon className={submenuIconClasses} />,
          name: 'Roles',
        },
        {
          path: '/dashboard-admin/settings-billing',
          icon: <WalletIcon className={submenuIconClasses} />,
          name: 'Permission',
        },
        {
          path: '/dashboard-admin/settings-team',
          icon: <UsersIcon className={submenuIconClasses} />,
          name: 'Team Members',
        },
      ]
    },

    {
      path: '/dashboard-siswa/dashboard',
      icon: <Squares2X2Icon className={iconClasses} />,
      name: 'Dashboard',
    },
    {
      path: '/dashboard-siswa/charts',
      icon: <PencilSquareIcon className={iconClasses} />,
      name: 'Jurnal',
    },
];

export default routes;
