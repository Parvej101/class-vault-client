import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../hooks/useAxiosSecure";
import Loading from "../shared/Loading";
import Swal from "sweetalert2";


const TeacherRequest = () => {
    // Fetch pending teacher requests
    const { data: teachers, isLoading, isError, refetch } = useQuery({
        queryKey: ['pendingTeachers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/teachers/pending');
            return res.data;
        },
        // Enable the query only if we need it
        enabled: true,
    });

    // Handle approve and reject buttons
    const handleApprove = async (email) => {
        try {
            // Call the backend API to approve the teacher request (backend API should be created for approval)
            const res = await axiosSecure.put(`/teachers/approve/${email}`);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Teacher request has been accepted",
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
            console.log('Teacher Approved:', res);
        } catch (error) {
            console.error('Error approving teacher:', error);
        }
    };

    const handleReject = async (email) => {
        try {
            // Call the backend API to reject the teacher request (backend API should be created for rejection)
            const res = await axiosSecure.delete(`/teachers/reject/${email}`);
            console.log('Teacher Rejected:', res);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Teacher request has been rejected",
                showConfirmButton: false,
                timer: 1500
              });
              refetch()
        } catch (error) {
            console.error('Error rejecting teacher:', error);
        }
    };

    if (isLoading) return <Loading></Loading>
    if (isError) return <div>Error fetching teachers</div>;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 ">
            {teachers?.map((teacher , index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4 items-center text-center">
                    <img
                        src={teacher.photo}
                        alt={teacher.name}
                        className="w-24 h-24 object-cover  mb-4 rounded-full mx-auto"
                    />
                    <h3 className="text-xl font-semibold mb-2">{teacher.name}</h3>
                    <p className="text-gray-500">Experience: {teacher.experience} years</p>
                    <p className="text-gray-500">Title: {teacher.title}</p>
                    <p className="text-gray-500">Category: {teacher.category}</p>
                    <p className="text-gray-500">Status: {teacher.status}</p>

                    {/* Approve / Reject buttons */}
                    <div className="flex gap-4 mt-4 justify-center">
                        <button
                            onClick={() => handleApprove(teacher.email)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                            Approve
                        </button>
                        <button
                            onClick={() => handleReject(teacher.email)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeacherRequest;