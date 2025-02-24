import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import animation from '../assets/lottie/login.json';
import { Player } from "@lottiefiles/react-lottie-player";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { FaGoogle } from "react-icons/fa";
import Loading from "../shared/Loading";
import axiosPublic from "../hooks/useAxiosPublic";

const Login = () => {

    const { login: loginUser, loginWithGoogle, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

     // Handle redirection after login
     const handleRedirect = () => {
        const redirectTo = location.state?.from?.pathname || '/'; // Default to '/' if no state exists
        console.log('Redirecting to:', redirectTo); // Debugging log
        navigate(redirectTo, { replace: true });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const { email, password } = data;
        try {
            await loginUser(email, password);

            // Show success alert
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully Login",
                showConfirmButton: false,
                timer: 1500
            });

            handleRedirect();
        } catch (error) {
            console.log("firebase login error", error);
            Swal.fire({
                title: 'Login Failed',
                text: 'Invalid email or password.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };
    
    const handleGoogleLogin = async () => {
        try {
            const user = await loginWithGoogle();  // Get user data from loginWithGoogle
            if (user) {
                // Prepare user data to send
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    phoneNumber: user.phoneNumber || "I don't have number",
                    role: "user",
                };
    
                // Send the user data to the server
                const response = await axiosPublic.post("/users", userInfo);
    
                if (response.status === 200) {
                    // If user already exists (409), display appropriate message
                    if (response.data.message === 'user already exists') {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Successfully Logged In",
                            text: "User already exists in the database.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    } else {
                        // For a successful insert or a new user
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Successfully Logged In",
                            text: "User successfully created and logged in.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
    
                    // Redirect after successful login
                    handleRedirect();
                }
            }
        } catch (error) {
            // If an error occurs during the login or user creation process
            if (error.response && error.response.status === 409) {
                // Handle the 409 error gracefully and show a user-friendly message
                Swal.fire({
                    title: 'User already exists',
                    text: 'You have successfully logged in as the user.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } else {
                // If it's some other error, show a generic error message
                console.log("Google login error", error);
                Swal.fire({
                    title: 'Google Login Failed',
                    text: 'An error occurred during Google login.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        }
    };
    return (
        <div className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-yellow-100">
            {/* Lottie Animation */}
            <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
                <Player
                    autoplay
                    loop
                    src={animation}
                    className="w-72 lg:w-96"
                />
            </div>

            {/* Login Form */}
            {loading ? (<Loading></Loading>) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/3 z-10"
                >
                    <h2 className="text-3xl font-extrabold text-center mb-6 text-orange-600">
                        Login to Your Account
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Login
                        </motion.button>
                    </form>
                    {/* Google Login Button */}
                    <div className="mt-4 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                        >
                            <FaGoogle className="mr-2" />
                            Login with Google
                        </motion.button>
                        <p className="mt-2">If you new please <Link to='/register'><span className="text-red-500 font-semibold">Register</span></Link></p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Login;