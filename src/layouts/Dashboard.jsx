import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
// import 'react-pro-sidebar/dist/css/styles.css'; // Default styles for the sidebar
import { FaHome, FaBars, FaUser, FaBookOpen, FaPlusCircle, FaFile, FaFileVideo, FaUpload, FaUsers, FaVideo } from 'react-icons/fa';

import { Link, Outlet, useLocation } from 'react-router-dom';
import Wellcome from '../pages/DashboardPage/Wellcome';
import useRole from '../hooks/useRole';
import Loading from '../shared/Loading';

const Dashboard = () => {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false);
    const { role, isLoading, roleData } = useRole();
    console.log(role,isLoading);
    // const role = "admin"
    // const isLoading = false

    // Toggle the sidebar
    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    // loading loader
    if (isLoading) {
        return <Loading></Loading>
    }
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
                {/* student dashborad */}
                {role === 'user' && (
                    <Menu>
                        <Link to='/'> <MenuItem icon={<FaHome />}>Home</MenuItem></Link>
                        <Link to='/dashboard/profile'> <MenuItem icon={<FaUser />}>Profile</MenuItem></Link>
                        <Link to='/dashboard/myEnroll'> <MenuItem icon={<FaBookOpen></FaBookOpen>}>My Enroll</MenuItem></Link>
                    </Menu>
                )}
                 {/* Teacher dashboard */}
                {
                    role === 'teacher' && (
                        <Menu>
                            <Link to='/'> <MenuItem icon={<FaHome />}>Home</MenuItem></Link>

                            <Link to='/dashboard/addClass'> <MenuItem icon={<FaPlusCircle></FaPlusCircle>}>Add Class</MenuItem></Link>

                            <Link to='/dashboard/myClass'> <MenuItem icon={<FaFileVideo></FaFileVideo>}>My Class</MenuItem></Link>

                            <Link to='/dashboard/profile'> <MenuItem icon={<FaUser></FaUser>}>Profile</MenuItem></Link>
                        </Menu>
                    )}
                    {/* admin dashboard */}
                {role === 'admin' && (
                    <Menu>
                        <Link to='/'> <MenuItem icon={<FaHome />}>Home</MenuItem></Link>
                        <Link to='/dashboard/teacherRequest'> <MenuItem icon={<FaUpload></FaUpload>}>Teacher Request</MenuItem></Link>
                        <Link to='/dashboard/users'> <MenuItem icon={<FaUsers></FaUsers>}>Users</MenuItem></Link>
                        <Link to='/dashboard/courses'> <MenuItem icon={<FaVideo></FaVideo>}>All classes</MenuItem></Link>
                        <Link to='/dashboard/myEnroll'> <MenuItem icon={<FaUser></FaUser>}>Profile</MenuItem></Link>
                    </Menu>
                )}

                {!role && (
                    <div className="bg-red-100 p-4 rounded-lg shadow-md">
                        <p>No role-specific operations available.</p>
                    </div>
                )}
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