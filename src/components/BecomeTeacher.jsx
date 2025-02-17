import { Link } from 'react-router-dom';
import image from '../assets/pictures/become-teacher.png'

const BecomeTeacher = () => {
    return (
        <div className="flex items-center justify-center p-8 bg-white  w-10/12 mx-auto">
            {/* Teacher's Picture Section */}
            <div className="w-1/2 p-4">
                <img
                    src={image}
                    alt="Teacher"
                    className="w-full h-full object-cover shadow-lg"
                />
            </div>

            {/* Title and Description Section */}
            <div className="w-1/2 pl-8">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Become an Instructor</h2>
                <p className="text-lg text-gray-600 mb-6">
                    At our platform, we provide the best opportunities for instructors to
                    share their expertise. Join us today and help shape the future of education!
                    Whether you're a seasoned professional or just starting, you can make a difference.
                </p>
                <Link to='applyTeacher'>
                    <button className="btn hover:bg-green-500 text-black  btn-outline font-semibold py-2 px-6 rounded-lg shadow-md  transition duration-300">
                        Start Teaching Today
                    </button></Link>
            </div>
        </div>
    );
};

export default BecomeTeacher;