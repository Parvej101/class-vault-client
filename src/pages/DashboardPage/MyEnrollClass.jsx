import React, { useEffect, useState } from 'react';
import axiosSecure from '../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MyEnrollClass = () => {
    const { user } = useAuth();
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    useEffect(() => {
        const fetchEnrolledClasses = async () => {
            try {
                const { data } = await axiosSecure.get(`/enrollCourse?email=${user.email}`);
                setEnrolledClasses(data);
            } catch (error) {
                console.error("Error fetching enrolled classes:", error.message);
            }
        };

        fetchEnrolledClasses();
    }, [user.email]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">My Enrolled Classes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {enrolledClasses.length === 0 ? (
                    <p className="col-span-full text-center text-gray-600">No enrolled classes yet.</p>
                ) : (
                    enrolledClasses.map((course) => (
                        <div key={course._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-gray-800">{course.title}</h2>
                                <p className="text-sm text-gray-600">Instructor: {course.instructorName}</p>
                                <Link to={`/dashboard/assignment/${course.courseId}`} state={{ course }}>
                                    <button className="mt-4 bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 transition">
                                        Continue
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyEnrollClass;