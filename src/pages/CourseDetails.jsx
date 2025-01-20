import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../shared/Loading';

const CourseDetails = () => {
    const { id } = useParams(); // Get the course ID from the URL
    console.log(id);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Fetch the course details based on the ID
        fetch(`http://localhost:5000/courseDetails/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCourse(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching course details:", error));
    }, [id]);
    console.log(course);
    if(loading){
        return <Loading></Loading>
    }
    
    return (
        <div className="lg:w-2/4 mx-auto lg:mt-44 rounded-lg overflow-hidden shadow-lg bg-white">
            {/* Course Image */}
            <img
                src={course.image}
                alt={course.title}
                className="w-full h-96 object-cover"
            />
            <div className="p-6">
                {/* Course Title */}
                <h2 className="text-2xl font-bold text-orange-600">{course.title}</h2>
                <p className="mt-2 text-sm text-gray-600">By: {course.name}</p>
                <p className="text-sm text-gray-600">Email: {course.email}</p>
                
                {/* Price and Enrolled */}
                <p className="mt-4 text-xl font-semibold">{course.price}</p>
                <p className="mt-2 text-sm text-gray-500">Enrolled: {course.enrolled}</p>
                
                {/* Description */}
                <p className="mt-4 text-sm text-gray-700">{course.description}</p>

                {/* Pay Button */}
                <div className="mt-6">
                    <button className="w-full py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-all">
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;