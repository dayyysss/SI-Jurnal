import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import { showNotification } from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useState } from 'react'
import { BuildingOffice2Icon, PencilSquareIcon, IdentificationIcon, DocumentDuplicateIcon, KeyIcon, UsersIcon, BoltIcon, Cog6ToothIcon, UserIcon, ArrowRightOnRectangleIcon, CalendarDaysIcon, ExclamationTriangleIcon, DocumentIcon, CodeBracketSquareIcon, WalletIcon, TableCellsIcon, Squares2X2Icon, DocumentTextIcon, BellIcon } from '@heroicons/react/24/outline';

const statsData = [
    { title: "Total Siswa", value: "34.7k", icon: <IdentificationIcon className='w-8 h-8' /> },
    { title: "Total Sekolah", value: "$34,545", icon: <BuildingOffice2Icon className='w-8 h-8' /> },
    { title: "Total Jurnal", value: "450", icon: <PencilSquareIcon className='w-8 h-8' /> },
    { title: "Active Users", value: "5.6k", icon: <UsersIcon className='w-8 h-8' /> },
];

function Dashboard() {
    const dispatch = useDispatch();

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({ message: `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status: 1 }));
    };

    return (
        <>
            {/** ---------------------- Select Period Content ------------------------- */}
            <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod} />

            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>

            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>

            {/** ---------------------- Different stats content 2 ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div>

            {/** ---------------------- User source channels table  ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div>
        </>
    );
}

export default Dashboard;
