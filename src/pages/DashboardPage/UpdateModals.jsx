import { useForm } from 'react-hook-form';
import axiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UpdateModals = ({ cls, onClose, refetch }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: cls,
    });

    const onSubmit = async (data) => {
        // Remove _id from the data to ensure it's not part of the update request
        const { _id, ...updatedData } = data;  // Destructure to remove _id
    
        try {
            // Send the updated class data without _id
            await axiosSecure.put(`/classes/${cls._id}`, updatedData);
            Swal.fire('Updated!', 'Class updated successfully', 'success');
            onClose();
            refetch();
        } catch (error) {
            console.error('Error updating class:', error.response?.data || error.message);
            Swal.fire('Error!', 'Failed to update class.', 'error');
        }
    };
    
    return (
        <div className="modal">
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

export default UpdateModals;