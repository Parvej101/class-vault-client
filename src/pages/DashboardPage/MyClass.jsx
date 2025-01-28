import React, { useState } from 'react';
import Loading from '../../shared/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import axiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const UpdateModals = ({ cls, onClose, refetch }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: cls,
    });

    const onSubmit = async (data) => {
        try {
            await axiosSecure.put(`/classes/${cls._id}`, data);
            Swal.fire('Updated!', 'Class updated successfully', 'success');
            refetch();
            onClose();
        } catch (error) {
            Swal.fire('Error!', 'Failed to update class.', 'error');
        }
    };

    // Reset form when modal opens or closes
    React.useEffect(() => {
        reset(cls);
    }, [cls, reset]);

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update Class</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block font-medium">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Price</label>
                        <input
                            type="number"
                            {...register('price', { required: true })}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-medium">Description</label>
                        <textarea
                            {...register('description')}
                            className="textarea textarea-bordered w-full"
                        />
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const MyClass = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: classes = [], refetch, isLoading } = useQuery({
        queryKey: ['classes', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/classes?email=${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/classes/${id}`);
                    Swal.fire('Deleted!', 'Your class has been deleted.', 'success');
                    refetch();
                } catch (error) {
                    Swal.fire('Error!', 'Failed to delete class.', 'error');
                }
            }
        });
    };

    if (isLoading) return <Loading />;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((cls) => (
                    <div key={cls._id} className="card shadow-lg p-4">
                        <img src={cls.image} alt={cls.title} className="w-full h-48 object-cover mb-4" />
                        <h2 className="text-xl font-semibold">{cls.title}</h2>
                        <p><strong>Name:</strong> {cls.name}</p>
                        <p><strong>Email:</strong> {cls.email}</p>
                        <p><strong>Price:</strong> ${cls.price}</p>
                        <p><strong>Description:</strong> {cls.description}</p>
                        <p><strong>Status:</strong> {cls.status}</p>
                        <div className="flex gap-2 mt-4">
                            <button
                                className="btn btn-warning"
                                onClick={() => setSelectedClass(cls)}
                            >
                                Update
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(cls._id)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-primary"
                                disabled={cls.status !== 'approved'}
                                onClick={() => navigate(`/dashboard/my-class/${cls._id}`)}
                            >
                                See Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            {selectedClass && (
                <UpdateModals
                    cls={selectedClass}
                    onClose={() => setSelectedClass(null)}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default MyClass;
