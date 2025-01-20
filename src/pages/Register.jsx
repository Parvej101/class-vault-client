import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import animation from '../assets/lottie/register.json'
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../shared/Loading";
import axiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
    const navigate = useNavigate()
    const { register: registerUser, loading, } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data);
        const { name, email, password, photoURL } = data;
        try {
            await registerUser(email, password, name, photoURL);

            // create user entry in database
            const userInfo = {
                name: name,
                email: email,
                photo: photoURL,
                role: "user"
            }
            axiosPublic.post('/users', userInfo)
                .then(res => {
                    if (res.data.insertedId) {
                        console.log('user added to the database');
                    }
                })
            // Show success alert
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully Register",
                showConfirmButton: false,
                timer: 1500
            });

            // navigate('/');
        } catch (error) {
            console.log("firebase register error", error);
        }
    };



    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-yellow-100">
            {/* Lottie Animation */}
            <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
                <Player
                    autoplay
                    loop
                    src={animation} // Replace with your Lottie JSON URL
                    className="w-72 lg:w-96"
                />
            </div>

            {/* Registration Form */}
            {
                loading ? (<Loading></Loading>) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/3 z-10"
                    >
                        <h2 className="text-3xl font-extrabold text-center mb-6 text-orange-600">
                            Create an Account
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name Input */}
                            <div>
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300"
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm">{errors.name.message}</span>
                                )}
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300"
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300"
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            {/* Photo URL Input */}
                            <div>
                                <label className="block text-gray-700">Photo URL</label>
                                <input
                                    type="url"
                                    {...register("photoURL", { required: "Photo URL is required" })}
                                    placeholder="Enter photo URL"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300"
                                />
                                {errors.photoURL && (
                                    <span className="text-red-500 text-sm">
                                        {errors.photoURL.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Register
                            </motion.button>
                        </form>
                        <p>You have already account <Link to='/login'><span className="text-red-500 font-semibold">Login</span></Link></p>
                    </motion.div>
                )
            }
        </div>
    );
};

export default Register;