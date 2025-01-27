import React from 'react';
import axiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../shared/Loading';
import Swal from 'sweetalert2';

const AdminClasses = () => {
    // Fetch pending teacher requests
    const { data: classes, isLoading, isError, refetch } = useQuery({
        queryKey: ['pendingTeachers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes/pending');
            return res.data;
        },
        enabled: true, // Enable the query immediately
    });

    // Handle approve action
    const handleApprove = async (email) => {
        try {
            // Call the backend API to approve the teacher request
            const res = await axiosSecure.put(`/classes/approve/${email}`);
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Teacher request has been accepted',
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();  // Refetch the data after approval
            console.log('Teacher Approved:', res);
        } catch (error) {
            console.error('Error approving teacher:', error);
        }
    };

    // Handle reject action
    const handleReject = async (email) => {
        try {
            // Call the backend API to reject the teacher request
            const res = await axiosSecure.put(`/classes/reject/${email}`);
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Teacher request has been rejected',
                showConfirmButton: false,
                timer: 1500,
            });
            refetch();  // Refetch the data after rejection
            console.log('Teacher Rejected:', res);
        } catch (error) {
            console.error('Error rejecting teacher:', error);
        }
    };

    if (isLoading) return <Loading />;
    if (isError) return <div>Error fetching classes</div>;
    return (
        <div>
        <h1 className='text-2xl text-center py-7'>Pending Class Requests : {classes.length}</h1>
        {classes.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Short Description</th>
                <th className="px-4 py-2">Actions</th>
                <th className="px-4 py-2">Progress</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls._id} className="border-b">
                  <td className="px-4 py-2">{cls.title}</td>
                  <td className="px-4 py-2">
                    <img src={cls.image} alt={cls.title} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="px-4 py-2">{cls.email}</td>
                  <td className="px-4 py-2">{cls.shortDescription}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleApprove(cls._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(cls._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    >
                      Reject
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleProgress(cls._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Progress
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
};

export default AdminClasses;