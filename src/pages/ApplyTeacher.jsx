import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import axiosSecure from '../hooks/useAxiosSecure';

const ApplyTeacher = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const categories = [
        "Web Development",
        "Digital Marketing",
        "Data Science",
        "Graphic Design",
        "Content Writing"
    ]; // List of categories

    // POST request function using axiosSecure
    const postTeachingPosition = async (data) => {
        console.log(data);
        try {
            const response = await axiosSecure.post('/teachers', {
                ...data,
                status: 'pending',  // Default status is 'pending'
                photo: user?.photoURL,  // Photo URL from logged-in user
                email: user?.email,
            });

            return response.data; // Return data if request is successful
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error submitting the form');
        }
    };

    // Using TanStack Query's useMutation to handle form submission
    const mutation = useMutation({
        mutationFn: postTeachingPosition,
        onSuccess: () => {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully Submitted",
                showConfirmButton: false,
                timer: 1500,
            });
        },
        onError: (error) => {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                confirmButtonText: "Try Again",
            });
        },
    });

    // Handle form submission
    const onSubmit = (data) => {
        mutation.mutate(data);  // Trigger the mutation
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Apply for Teaching Position</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        defaultValue={user?.displayName || ""}
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                </div>

                {/* User Image */}
                <div className="mb-4 ">
                    <label className="block text-gray-700 font-medium mb-2">Your Image</label>
                    {user?.photoURL ? (
                        <img src={user?.photoURL} alt="User" className="w-20 h-20 rounded-full object-cover" />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-white font-semibold">{user?.displayName?.charAt(0)}</span>
                        </div>
                    )}
                </div>

                {/* Email (Read-Only) */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={user?.email || ""}
                        readOnly
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300 bg-gray-100 cursor-not-allowed"
                    />
                </div>

                {/* Experience Level */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Experience Level</label>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                value="beginner"
                                {...register("experience", { required: "Experience level is required" })}
                                className="mr-2"
                            />
                            Beginner
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="mid-level"
                                {...register("experience", { required: "Experience level is required" })}
                                className="mr-2"
                            />
                            Mid-level
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="experienced"
                                {...register("experience", { required: "Experience level is required" })}
                                className="mr-2"
                            />
                            Experienced
                        </label>
                    </div>
                    {errors.experience && (
                        <span className="text-red-500 text-sm">{errors.experience.message}</span>
                    )}
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        {...register("title", { required: "Title is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
                    />
                    {errors.title && (
                        <span className="text-red-500 text-sm">{errors.title.message}</span>
                    )}
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        {...register("category", { required: "Category is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-orange-300"
                    >
                        <option value="">Select a category</option>
                        {categories.map((categoryOption, index) => (
                            <option key={index} value={categoryOption}>
                                {categoryOption}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <span className="text-red-500 text-sm">{errors.category.message}</span>
                    )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-all"
                    >
                        Submit for Review
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyTeacher;
