import React, { useState } from 'react';
import Loading from '../shared/Loading';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Users = () => {
    const [search, setSearch] = useState('');

    // Fetch users with server-side search
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        },
    });

    // Handle make admin button click
    const handleMakeAdmin = (email) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to make him an admin?!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Wait for the PUT request to finish
                    await axiosSecure.put(`/users/make-admin/${email}`);

                    // Show success message after the API call
                    Swal.fire({
                        title: "Make Admin!",
                        text: "Admin status successful",
                        icon: "success"
                    });

                    // Refresh the user list after the data is updated
                    refetch();

                } catch (error) {
                    console.error('Error making user admin:', error);

                    // Show error message if the request fails
                    Swal.fire({
                        title: "Error",
                        text: "Failed to make user admin.",
                        icon: "error"
                    });
                }
            }
        });
    };

    if (isLoading) return <Loading></Loading>;
    return (
        <div>
            {/* Search Input */}
            <div className="mb-4 lg:w-52 w- mt-5 ">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or email"
                    className="w-full px-4 py-2 border rounded-md"
                />
            </div>

            {/* User Table */}
            <table className="w-11/12 mx-auto table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-center">Image</th>
                        <th className="border px-4 py-2 text-center">Name</th>
                        <th className="border px-4 py-2 text-center">Email</th>
                        <th className="border px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.email} className="text-center">
                            <td className="border px-4 py-2">
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    className="w-14 h-14 rounded-full object-cover mx-auto"
                                />
                            </td>
                            <td className="border px-4 py-2">{user.name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleMakeAdmin(user.email)}
                                    disabled={user.role === 'admin'}
                                    className={`px-4 py-2 rounded-md ${user.role === 'admin'
                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                        : 'bg-blue-500 text-white'
                                        }`}
                                >
                                    {user.role === 'admin' ? 'Admin' : 'Make Admin'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;