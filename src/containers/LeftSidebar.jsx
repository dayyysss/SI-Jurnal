import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import SidebarSubmenu from './SidebarSubmenu';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import logo from '../assets/logo.png';

import adminRoutes from '../routes/adminRoutes';
import siswaRoutes from '../routes/siswaRoutes';

function LeftSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click();
    };

    const roles = JSON.parse(Cookies.get("roles") || "[]");

    let routes;
    if (roles.includes("admin")) {
        routes = adminRoutes;
    } else if (roles.includes("siswa")) {
        routes = siswaRoutes;
    }

    return (
        <div className="drawer-side z-30">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu pt-2 w-80 bg-base-100 min-h-full text-base-content">
                <button className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="h-5 inline-block w-5" />
                </button>
                <li className="mb-2 font-semibold text-xl">
                    <Link to={'/dashboard-admin/dashboard'}>
                        <img className="mask mask-squircle w-10" src={logo} alt="Jurnal Logo" /> SI Jurnal
                    </Link>
                </li>
                {
                    routes.map((route, k) => {
                        return (
                            <li className="" key={k}>
                                {
                                    route.submenu ? 
                                        <SidebarSubmenu {...route}/> : 
                                        (<NavLink
                                            end
                                            to={route.path}
                                            className={({ isActive }) => `${isActive ? 'font-semibold bg-base-200' : 'font-normal'}`} >
                                            {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (
                                                    <span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary" aria-hidden="true"></span>
                                                ) : null
                                            }
                                        </NavLink>)
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default LeftSidebar;
