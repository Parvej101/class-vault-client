import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../assets/pictures/class-vault-banner.png'

const Banner = () => {
    return (
        <section className="bg-gradient-to-r text-[#2C3E50] flex  items-center justify-center lg:h-screen my-5">
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center ">
            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left md:mt-2 mt-5">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Revolutionizing <br /> Education Management
                </h1>
                <p className="text-lg mb-6">
                    Empowering institutions, tutors, and students to learn, teach, and grow seamlessly with ClassVault.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                    <Link to="/register" className="btn hover:bg-green-500 text-black  btn-outline">
                        Get Started
                    </Link>
                    <Link to="/allClasses" className="btn hover:bg-orange-500 text-black btn-outline">
                        Explore Classes
                    </Link>
                </div>
            </div>
    
            {/* Hero Image or Animation */}
            <div className="md:w-1/2 mt-8 md:mt-0">
                <img
                    src={bannerImg}
                    alt="Education Banner"
                    className="rounded-lg shadow-lg"
                />
            </div>
        </div>
    </section>
    );
};

export default Banner;