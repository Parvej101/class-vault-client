import image1 from '../assets/pictures/4.png';
import image2 from '../assets/pictures/6.png';
import image3 from '../assets/pictures/7.png';
import image4 from '../assets/pictures/8.png';
import image5 from '../assets/pictures/9.png';

const Sponsors = () => {
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8">
                    Trusted Partners in Learning
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
                    <img
                        src={image1}
                        alt="Sponsor 1"
                        className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain transform transition-transform hover:scale-110 hover:rotate-2"
                    />
                    <img
                        src={image2}
                        alt="Sponsor 2"
                        className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain transform transition-transform hover:scale-110 hover:-rotate-2"
                    />
                    <img
                        src={image3}
                        alt="Sponsor 3"
                        className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain transform transition-transform hover:scale-110 hover:rotate-2"
                    />
                    <img
                        src={image4}
                        alt="Sponsor 4"
                        className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain transform transition-transform hover:scale-110 hover:-rotate-2"
                    />
                    <img
                        src={image5}
                        alt="Sponsor 5"
                        className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto object-contain transform transition-transform hover:scale-110 hover:rotate-2"
                    />
                </div>
            </div>
        </section>
    );
};

export default Sponsors;
