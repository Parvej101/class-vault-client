import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/pictures/class-vault-logo.png';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, logout } = useAuth();


    const navOptions = (
        <>
            <li className=' mb-2 '><NavLink to="/">Home</NavLink></li>
            <li className=' mb-2'><NavLink to="/allClasses">All Classes</NavLink></li>
            <li className=''><NavLink to="/applyTeacher">Teach On Class-Vault</NavLink></li>
        </>
    );

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        logout();
    };

    const userOptions = (
        <>
            <li className="mb-4 font-sm">{user?.name || "User Name"}</li>
            <li className='btn btn-wide mb-3'>
                <Link to="/dashboard" >Dashboard</Link>
            </li>
            <li>
                <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-700 btn btn-wide"
                >
                    Logout
                </button>
            </li>
        </>
    );

    return (
        <div className="navbar w-full items-center sticky top-0 z-[100] bg-[rgba(255,127,95,0.76)] backdrop-blur-lg left-0 right-0 px-4 lg:px-20 overflow-visible">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="font-bold menu menu-sm dropdown-content bg-[rgba(255,127,95,0.76)] rounded-box z-[1] mt-3 w-52 p-2 shadow text-white ">
                        {navOptions}
                    </ul>
                </div>
                <Link>
                    <div className='flex items-center gap-2'>
                        <img className='w-10 sm:w-12' src={logo} alt="Logo" />
                        <span className='font-bold text-lg sm:text-xl text-white'>Class Vault</span>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-bold text-white">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {!user ? (
                    <Link to="/login" className="btn hover:bg-green-500 shadow-xl btn-outline text-white">
                        Login
                    </Link>
                ) : (
                    <div className="relative z-50">
                        <button onClick={handleToggleDropdown}>
                            <img className="w-10 h-10 rounded-full" src={user?.photoURL || user.displayName} alt="User" />
                        </button>
                        {showDropdown && (
                            <ul className="absolute right-0 mt-2 py-5 px-5 bg-[rgba(255,127,95,0.76)] text-black shadow-lg rounded-lg z-50">
                                {userOptions}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
