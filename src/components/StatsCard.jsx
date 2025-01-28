import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import statsImg from '../assets/pictures/courses.png'
import { FaBook, FaStoreAltSlash, FaUser } from 'react-icons/fa';
const StatsCard = () => {
    const [stats, setStats] = useState({ totalUser: 0, totalClass: 0, totalEnrollment: 0 });
  
    useEffect(() => {
      // Fetching stats from the backend
      fetch('https://class-vault-server.vercel.app/stats')
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((error) => console.error('Error fetching stats:', error));
    }, []);
  
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-orange-100 py-10 px-5 lg:px-20">
            {/* Left section - Stats cards */}
            <div className="flex flex-col space-y-8 lg:w-1/2">
                {/* Total Users Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="bg-white p-6 rounded-lg shadow-xl w-full flex items-center justify-between"
                >
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUser}</p>
                    </div>
                    <div className="text-4xl text-blue-500"><FaUser></FaUser></div>
                </motion.div>

                {/* Total Classes Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="bg-white p-6 rounded-lg shadow-xl w-full flex items-center justify-between"
                >
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">Total Classes</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalClass}</p>
                    </div>
                    <div className="text-4xl text-green-500"><FaBook></FaBook></div>
                </motion.div>

                {/* Total Enrollment Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="bg-white p-6 rounded-lg shadow-xl w-full flex items-center justify-between"
                >
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800">Total Enrollment</h3>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalEnrollment}</p>
                    </div>
                    <div className="text-4xl text-yellow-500"><FaStoreAltSlash></FaStoreAltSlash></div>
                </motion.div>
            </div>

            {/* Right section - Image relevant to your website */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
                <img
                    src={statsImg} // Replace with your image
                    alt="Website illustration"
                    className="rounded-lg shadow-lg w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default StatsCard;