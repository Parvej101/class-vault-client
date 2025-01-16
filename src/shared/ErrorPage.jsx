
import { Link } from 'react-router-dom';
import errorAnimation from '../assets/lottie/Animation - 1737052414091.json';
import Lottie from 'lottie-react';
const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <Lottie animationData={errorAnimation} loop={true} autoplay={true} className="w-72 h-72" />
        <h1 className="text-5xl font-bold">404</h1>
        <p className="mt-2 text-xl">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 text-lg font-semibold bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-200 transition"
        >
          Go Back Home
        </Link>
      </div>
    );
};

export default ErrorPage;