import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showNotification } from '../common/headerSlice';
import DashboardStats from './components/DashboardStats';
import AmountStats from './components/AmountStats';
import PageStats from './components/PageStats';
import UserChannels from './components/UserChannels';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import DashboardTopBar from './components/DashboardTopBar';
import DoughnutChart from './components/DoughnutChart';
import { BuildingOffice2Icon, PencilSquareIcon, IdentificationIcon, NewspaperIcon } from '@heroicons/react/24/outline';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [statsData, setStatsData] = useState([
        { title: "Total User", value: "0", icon: <IdentificationIcon className='w-8 h-8' /> },
        { title: "Total Sekolah", value: "0", icon: <BuildingOffice2Icon className='w-8 h-8' /> },
        { title: "Total Jurnal", value: "0", icon: <PencilSquareIcon className='w-8 h-8' /> },
        { title: "Total Blog", value: "0", icon: <NewspaperIcon className='w-8 h-8' /> },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

                const response = await axios.get('http://127.0.0.1:8000/api/admin/dashboard', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const { user: totalUser, sekolah: totalSekolah, jurnal: totalJurnal, blog: totalBlog } = response.data.data;

                setStatsData([
                    { title: "Total User", value: totalUser.toString(), icon: <IdentificationIcon className='w-8 h-8' /> },
                    { title: "Total Sekolah", value: totalSekolah.toString(), icon: <BuildingOffice2Icon className='w-8 h-8' /> },
                    { title: "Total Jurnal", value: totalJurnal.toString(), icon: <PencilSquareIcon className='w-8 h-8' /> },
                    { title: "Total Blog", value: totalBlog.toString(), icon: <NewspaperIcon className='w-8 h-8' /> },
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

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

            {/* * ---------------------- Different stats content 2 -------------------------
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

            {/* * ---------------------- User source channels table  -------------------------
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div> */}
        </>
    );
}

export default Dashboard;
