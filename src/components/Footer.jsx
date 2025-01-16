import { FaFacebookF, FaTwitter, FaLinkedinIn, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
        {/* Footer Main Content */}
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
                <h3 className="text-xl font-semibold text-white">About ClassVault</h3>
                <p className="mt-4 text-sm">
                    ClassVault is a next-gen educational platform designed to enhance collaboration between institutions, tutors, and students for skill learning and class management.
                </p>
            </div>

            {/* Quick Links */}
            <div>
                <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                <ul className="mt-4 space-y-2 text-sm">
                    <li>
                        <Link to="/" className="hover:text-white">Home</Link>
                    </li>
                    <li>
                        <Link to="/allClasses" className="hover:text-white">All Classes</Link>
                    </li>
                    <li>
                        <Link to="/teach" className="hover:text-white">Teach on ClassVault</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
                    </li>
                </ul>
            </div>

            {/* Contact Information */}
            <div>
                <h3 className="text-xl font-semibold text-white">Contact Us</h3>
                <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-center space-x-2">
                        <FaEnvelope /> <span>info@classvault.com</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FaPhoneAlt /> <span>+1 234 567 890</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <FaEnvelope /> <span>123 Learning Lane, Education City</span>
                    </li>
                </ul>
            </div>

            {/* Social Media */}
            <div>
                <h3 className="text-xl font-semibold text-white">Follow Us</h3>
                <div className="flex space-x-4 mt-4">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-2xl"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-2xl"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white text-2xl"
                    >
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-gray-800 text-center py-4 text-sm text-gray-400">
            <p>© 2025 ClassVault. All Rights Reserved.</p>
        </div>
    </footer>
    );
};

export default Footer;