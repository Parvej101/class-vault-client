import React, { useEffect, useState } from 'react';
import axiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../shared/Loading';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
    const [user, setUser] = useState(null);
    const {user : userEmail} = useAuth()
    const email = userEmail.email;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosSecure.get(`/users?email=${email}`);
                
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setUser(response.data[0]); // Use the first user from the array
                } else {
                    Swal.fire({
                        title: 'No User Found',
                        text: 'No user data matching the email was found.',
                        icon: 'info',
                        confirmButtonText: 'Okay',
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                Swal.fire({
                    title: 'Error',
                    text: error.response?.data?.message || 'Failed to load user data.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, [email]);
    
console.log(user);
    // If the data is still loading
    if (loading) {
        return <Loading></Loading>
    }

    // If user data is not found
    if (!user) {
        return <div className="flex items-center justify-center h-screen">No user data found.</div>;
    }
    return (
        <div className="w-2/4 mx-auto flex items-center justify-center h-screen">
            <div className="w-2/4 rounded-lg shadow-lg bg-orange-100 p-6">
                <img
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-orange-300"
                    src={user.photo }
                    alt={user.name}
                />
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-orange-700 mb-2">{user.name}</h2>
                    <p className="text-lg text-gray-600"><strong>Role:</strong> {user.role}</p>
                    <p className="text-lg text-gray-600"><strong>Email:</strong> {user.email}</p>
                    <p className="text-lg text-gray-600">
                        <strong>Phone:</strong> {user.phoneNumber || 'Not available'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;