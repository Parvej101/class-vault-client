import { Link } from 'react-router-dom';
import image from '../assets/pictures/become-teacher.png';

const BecomeTeacher = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-6 md:p-8 bg-white w-11/12 mx-auto">
            {/* Teacher's Picture Section */}
            <div className="w-full md:w-1/2 p-4 flex justify-center">
                <img
                    src={image}
                    alt="Teacher"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto object-cover shadow-lg rounded-lg"
                />
            </div>

            {/* Title and Description Section */}
            <div className="w-full md:w-1/2 p-4 text-center md:text-left">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Become an Instructor</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6">
                    At our platform, we provide the best opportunities for instructors to
                    share their expertise. Join us today and help shape the future of education!
                    Whether you're a seasoned professional or just starting, you can make a difference.
                </p>
                <Link to='/applyTeacher'>
                    <button className="btn hover:bg-green-500 text-black btn-outline font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300">
                        Start Teaching Today
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default BecomeTeacher;
