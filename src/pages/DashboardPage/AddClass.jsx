import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import axiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddClass = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();
    const { user } = useAuth();
    const onSubmit = async (data) => {
        try {
          const classData = {
            ...data,
            price: Number(data.price),
            status: 'pending', // Default status
            email: user.email,
            name: user.displayName,
            enrolled : 0
          };
    
          const response = await axiosSecure.post('/classes', classData);
    
          if (response.data.insertedId) {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Class added successfully',
              showConfirmButton: false,
              timer: 1500,
            });
    
            reset(); // Reset the form
            navigate('/dashboard/myClass'); // Redirect to 'My Classes' page
          }
        } catch (error) {
          console.error('Error adding class:', error);
          Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'Failed to add class',
            text: error.message,
            showConfirmButton: true,
          });
        }
      };
    return (
        <div className="lg:w-2/3 w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add a New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium">Class Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="input input-bordered w-full"
            placeholder="Enter class title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Your Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required' })}
            className="input input-bordered w-full"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="textarea textarea-bordered w-full"
            placeholder="Enter class description"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Class Image</label>
          <input
            type="url"
            {...register('image', { required: 'Image URL is required' })}
            className="input input-bordered w-full"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full">Add Class</button>
        </div>
      </form>
    </div>
    );
};

export default AddClass;