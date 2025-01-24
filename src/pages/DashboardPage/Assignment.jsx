import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactRating from "react-rating";
import axiosSecure from "../../hooks/useAxiosSecure";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Assignment = () => {
    const location = useLocation();
    const {course} = location.state || {}
    const {user} =useAuth()


    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [link, setLink] = useState("");
    const [isTERModalOpen, setIsTERModalOpen] = useState(false); // State for TER modal
    const [review, setReview] = useState(""); // Review text
    const [rating, setRating] = useState(0); // Rating value

    // Query client instance
    const queryClient = useQueryClient();

    // Fetch assignments data
    useEffect(() => {
        fetch("/assignment.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch the data.");
                }
                return response.json();
            })
            .then((data) => {
                setAssignments(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // Open and close modal handlers
    const handleOpenModal = (assignment) => setSelectedAssignment(assignment);
    const handleCloseModal = () => {
        setSelectedAssignment(null);
        setLink("");
    };

    // Submit link
    const handleSubmitLink = () => {
        if (link) {
            console.log(`Link submitted for ${selectedAssignment.title}: ${link}`);
            handleCloseModal();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Link submitted successfully for ${selectedAssignment.title}`,
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please enter a valid link!",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    // TER Modal Handlers
    const handleTERModalOpen = () => setIsTERModalOpen(true);
    const handleTERModalClose = () => {
        setIsTERModalOpen(false);
        setReview("");
        setRating(0);
    };

    // Mutation for submitting the review
    const submitReviewMutation = useMutation({
        mutationFn: async (reviewData) => {
            const response = await axiosSecure.post("/reviews", reviewData);
            return response.data;
        },
        onSuccess: () => {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Review submitted successfully!",
                showConfirmButton: false,
                timer: 1500,
            });

            // Refetch data if needed
            queryClient.invalidateQueries(["reviews"]);
            handleTERModalClose();
        },
        onError: (error) => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Error submitting review: ${error.message}`,
                showConfirmButton: false,
                timer: 1500,
            });
        },
    });
    // send data in database
    const image = user.photoURL
    const name = user.displayName
    const title = course.title

    // Submit Review Handler
    const handleSubmitReview = () => {
        if (!review || rating === 0) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Please provide both a review and a rating!",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }
      
        const reviewData = { review, rating,image, name, title};
        submitReviewMutation.mutate(reviewData);
        console.log(reviewData);
    };

    return (
        <div className="p-4 relative">
            {/* TER Button */}
            <div onClick={handleTERModalOpen} className="absolute top-4 left-4">
                <button className="rounded-xl bg-orange-500 text-white px-8 font-bold py-2 shadow hover:bg-orange-600 transition">
                    TER
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Assignments</h1>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="py-3 px-2 text-gray-600">ID</th>
                            <th className="py-3 px-2 text-gray-600">Title</th>
                            <th className="py-3 px-2 text-gray-600">Description</th>
                            <th className="py-3 px-2 text-gray-600">Deadline</th>
                            <th className="py-3 px-2 text-gray-600">Total Marks</th>
                            <th className="py-3 px-2 text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((assignment, index) => (
                            <tr key={index} className="border-b border-gray-300 hover:bg-gray-50 transition">
                                <td className="py-4 px-2">{index + 1}</td>
                                <td className="py-4 px-2 font-semibold">{assignment.title}</td>
                                <td className="py-4 px-2">{assignment.description}</td>
                                <td className="py-4 px-2">{assignment.deadline}</td>
                                <td className="py-4 px-2">{assignment.totalMarks}</td>
                                <td className="py-4 px-2">
                                    <button
                                        onClick={() => handleOpenModal(assignment)}
                                        className="btn bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                                    >
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Submit Assignment Modal */}
            {selectedAssignment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md mx-auto">
                        <h2 className="text-xl font-bold mb-4 text-center sm:text-left">
                            Submit Assignment: {selectedAssignment.title}
                        </h2>
                        <label className="block text-gray-700 mb-2" htmlFor="link">
                            Submission Link
                        </label>
                        <input
                            type="url"
                            id="link"
                            value={link}
                            required
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter submission link"
                            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <div className="flex flex-col sm:flex-row justify-end gap-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                                onClick={handleSubmitLink}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TER Modal */}
            {isTERModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md mx-auto">
                        <h2 className="text-xl font-bold mb-4">Submit Review</h2>
                        <label className="block text-gray-700 mb-2">Review</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write your review"
                            className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <label className="block text-gray-700 mb-2">Rating</label>
                        <ReactRating
                            initialRating={rating}
                            onChange={(value) => setRating(value)}
                            emptySymbol={<FaRegStar className="text-gray-400 text-2xl" />}
                            fullSymbol={<FaStar className="text-orange-500 text-2xl" />}
                        />
                        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                                onClick={handleTERModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                                onClick={handleSubmitReview}
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Assignment;
