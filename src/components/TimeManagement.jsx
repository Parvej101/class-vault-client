import React, { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa';

const TimeManagement = () => {
  const [time, setTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <div className="bg-orange-100 text-orange-500 p-5 sm:p-10 rounded-lg shadow-lg relative overflow-hidden">
      <div className="text-center text-3xl font-bold">
        <h2>Time Management</h2>
        <p className="text-lg my-4">Master your time with the right tools and techniques</p>
      </div>

      {/* Flexbox for larger screens, stacked for smaller ones */}
      <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-6 w-full space-y-6 sm:space-y-0">
        {/* Digital Clock Section with Frame */}
        <div className="flex justify-center items-center w-full sm:w-auto">
          <div className="relative w-64 h-64 flex justify-center items-center bg-gray-100 rounded-full border-4 border-orange-600 shadow-md">
            <div className="text-4xl font-mono text-orange-600">
              <span>{hours}:{minutes}:{seconds}</span>
            </div>
          </div>
        </div>

        {/* Time Management Card */}
        <div className="w-full sm:w-auto max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden sm:max-w-2xl">
          <div className="flex flex-col sm:flex-row w-full">
            {/* First section: Importance of Time */}
            <div className="p-8">
              <h2 className="text-xl font-semibold text-orange-600">Importance of Time Management</h2>
              <p className="mt-4 text-gray-600">
                Time management is crucial for achieving personal and professional goals. By prioritizing tasks,
                avoiding procrastination, and staying organized, one can make the most of their time and achieve more.
              </p>

              <div className="mt-6">
                <ul className="list-disc pl-6">
                  <li className="text-gray-800">Increase productivity</li>
                  <li className="text-gray-800">Reduce stress and anxiety</li>
                  <li className="text-gray-800">Ensure consistent progress towards goals</li>
                  <li className="text-gray-800">Enhance focus and concentration</li>
                </ul>
              </div>
            </div>

            {/* Second section: How to Manage Time */}
            <div className="p-8 bg-gray-100 flex justify-center items-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">How to Manage Time Effectively</h3>
                <p className="mt-4 text-gray-600">Use techniques like time blocking, prioritizing tasks, and setting goals!</p>
                <button className="mt-6 hover:bg-green-400 text-black btn-outline border py-2 px-6 rounded-lg transition-all shadow-lg">
                  <div className="flex justify-center items-center gap-4">
                    <span><FaClock className="text-2xl items-center justify-center" /></span>
                    <span>Organizing Your Time</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeManagement;
