// src/components/sidebar.jsx
import BellIcon from '@heroicons/react/24/outline/BellIcon';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon';
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon';
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon';
import WalletIcon from '@heroicons/react/24/outline/WalletIcon';
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon';
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon';
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon';
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon';
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon';
import BoltIcon from '@heroicons/react/24/outline/BoltIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import KeyIcon from '@heroicons/react/24/outline/KeyIcon';
import { BuildingOffice2Icon, PencilSquareIcon, IdentificationIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
  {
    path: '/dashboard-admin/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />, 
    name: 'Dashboard',
  },
  {
    path: '/dashboard-admin/leads',
    icon: <IdentificationIcon className={iconClasses} />,
    name: 'Data Siswa',
  },
  {
    path: '/dashboard-admin/transactions',
    icon: <BuildingOffice2Icon className={iconClasses} />, 
    name: 'Data Sekolah',
  },
  {
    path: '/dashboard-admin/charts',
    icon: <PencilSquareIcon className={iconClasses} />, 
    name: 'Jurnal', 
  },
  {
    path: '/dashboard-admin/integration', 
    icon: <BoltIcon className={iconClasses} />,
    name: 'Integration', 
  },
  {
    path: '/dashboard-admin/calendar',
    icon: <CalendarDaysIcon className={iconClasses} />, 
    name: 'Calendar',
  },
  {
    path: '', 
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline`} />, 
    name: 'Pages', 
    submenu: [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses} />,
        name: 'Login',
      },
      {
        path: '/register', 
        icon: <UserIcon className={submenuIconClasses} />, 
        name: 'Register',
      },
      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses} />,
        name: 'Forgot Password',
      },
      {
        path: '/dashboard-admin/blank',
        icon: <DocumentIcon className={submenuIconClasses} />,
        name: 'Blank Page',
      },
      {
        path: '/dashboard-admin/404',
        icon: <ExclamationTriangleIcon className={submenuIconClasses} />,
        name: '404',
      },
    ]
  },
  {
    path: '', 
    icon: <Cog6ToothIcon className={`${iconClasses} inline`} />, 
    name: 'Settings', 
    submenu: [
      {
        path: '/dashboard-admin/settings-profile', 
        icon: <UserIcon className={submenuIconClasses} />, 
        name: 'Profile',
      },
      {
        path: '/dashboard-admin/settings-billing',
        icon: <WalletIcon className={submenuIconClasses} />,
        name: 'Billing',
      },
      {
        path: '/dashboard-admin/settings-team', 
        icon: <UsersIcon className={submenuIconClasses} />, 
        name: 'Team Members',
      },
    ]
  },
  {
    path: '', 
    icon: <DocumentTextIcon className={`${iconClasses} inline`} />, 
    name: 'Documentation', 
    submenu: [
      {
        path: '/dashboard-admin/getting-started', 
        icon: <DocumentTextIcon className={submenuIconClasses} />, 
        name: 'Getting Started',
      },
      {
        path: '/dashboard-admin/features',
        icon: <TableCellsIcon className={submenuIconClasses} />, 
        name: 'Features',
      },
      {
        path: '/dashboard-admin/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses} />, 
        name: 'Components',
      }
    ]
  },
];

export default routes;
