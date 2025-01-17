import { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";


const AllClasses = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the data from the public folder
        fetch("http://localhost:5000/courses")
            .then((response) => response.json())
            .then((data) => {
                setCourses(data);
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Calculate the indexes for pagination
    const classesPerPage = 5;
    const offset = currentPage * classesPerPage;
    const currentClasses = courses.slice(offset, offset + classesPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };
    return (
        <div className="course-list p-8">
            <h2 className="text-3xl font-bold mb-6">Available Courses</h2>

            {loading ? (
                <Loading /> // Show the loading spinner while fetching data
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {currentClasses.map((course, index) => (
                            <div
                                key={index}
                                className="card bg-white p-4 shadow-xl rounded-lg hover:scale-105 transition-transform duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-60 object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30 rounded-lg"></div>
                                </div>
                                <h3 className="text-xl font-bold mt-4">Title: {course.title}</h3>
                                <p className="text-lg font-semibold text-gray-600">Price: {course.price}</p>
                                <p className="text-lg font-semibold text-gray-500">Name: {course.name}</p>
                                <p className="text-lg font-semibold text-gray-500 mt-2">Description: {course.description}</p>
                               <Link>
                               <button className="w-full mt-4 btn bg-orange-400 text-white font-bold text-xl">
                                Enroll
                               </button>
                               </Link>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={Math.ceil(courses.length / classesPerPage)}
                            onPageChange={handlePageClick}
                            containerClassName="flex space-x-4"
                            pageClassName="px-4 py-2 border rounded-md hover:bg-gray-400  cursor-pointer"
                            pageLinkClassName="text-black font-bold"
                            previousClassName="px-4 py-2 border rounded-md cursor-pointer"
                            nextClassName="px-4 py-2 border rounded-md cursor-pointer"
                            activeClassName="bg-orange-300 text-white"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default AllClasses;