
import { Link } from 'react-router-dom';
// import errorAnimation from '../assets/lottie/Animation - 1737052414091.json';
import Lottie from 'lottie-react';
const ErrorPage = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-white">
      {/* <Lottie animationData={errorAnimation} loop={true} autoplay={true} className="w-72 h-72" /> */}
      <h1 className="text-5xl font-bold text-[#2C3E50]">404</h1>
      <p className="mt-2 text-xl text-[#34495E]">Oops! The page you're looking for doesn't exist.</p>
      <Link
          to="/"
          className="mt-6 px-6 py-3 text-lg font-semibold bg-[#16A085] text-white rounded-lg shadow-lg hover:bg-[#1ABC9C] transition"
      >
          Go Back Home
      </Link>
  </div>
    );
};

export default ErrorPage;