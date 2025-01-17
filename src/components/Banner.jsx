import React from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../assets/pictures/class-vault-banner.png'

const Banner = () => {
    return (
        <section className="bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-[#2C3E50] mt-24">
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
            {/* Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Revolutionizing Education Management
                </h1>
                <p className="text-lg mb-6">
                    Empowering institutions, tutors, and students to learn, teach, and grow seamlessly with ClassVault.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                    <Link to="/get-started" className="btn bg-[#16A085] text-white hover:bg-[#1ABC9C]">
                        Get Started
                    </Link>
                    <Link to="/allClasses" className="btn bg-[#E74C3C] text-white hover:bg-[#C0392B]">
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