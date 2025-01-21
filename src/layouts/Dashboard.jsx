import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css'; // Default styles for the sidebar
import { FaHome, FaBars, FaUser, FaBookOpen } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Wellcome from '../pages/DashboardPage/Wellcome';

const Dashboard = () => {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false);
    // Toggle the sidebar
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar className='bg-orange-600' collapsed={collapsed}>
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-orange-500 text-white rounded shadow mb-4"
                >
                    <FaBars />
                </button>
                <Menu>
                    <Link to='/'> <MenuItem icon={<FaHome />}>Home</MenuItem></Link>
                    <Link to='/dashboard/profile'> <MenuItem icon={<FaUser />}>Profile</MenuItem></Link>
                    <Link to='/dashboard/myEnroll'> <MenuItem icon={<FaBookOpen></FaBookOpen>}>My Enroll</MenuItem></Link>
                </Menu>
            </Sidebar>

            {/* Main Content */}
            <div className="flex-1  h-screen">
            {location.pathname === "/dashboard" && <Wellcome></Wellcome>}

                <Outlet></Outlet>

               
                    
               
            </div>
        </div>
    );
};

export default Dashboard;