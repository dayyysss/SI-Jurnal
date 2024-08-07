import { BuildingOffice2Icon, PencilSquareIcon, IdentificationIcon, DocumentDuplicateIcon, KeyIcon, UsersIcon, BoltIcon, Cog6ToothIcon, 
  UserIcon, ArrowRightOnRectangleIcon, CalendarDaysIcon, ExclamationTriangleIcon, DocumentIcon, CodeBracketSquareIcon, WalletIcon, TableCellsIcon, 
  Squares2X2Icon, DocumentTextIcon, BellIcon } from '@heroicons/react/24/outline';

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
];

export default routes;
