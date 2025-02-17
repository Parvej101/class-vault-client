import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import img from '../../src/assets/pictures/6.png'
import { useEffect, useState } from 'react';

const PopularClass = () => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('https://class-vault-server.vercel.app/popular-courses')
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='bg-orange-100 py-10'>
            <div className="text-center my-10">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                    Top <span className="text-orange-500">Enrolled Classes</span>
                </h2>
                <p className="text-lg text-gray-600">
                    Discover the most popular classes with the highest enrollment rates!
                </p>
            </div>
            <div className="w-5/6 mx-auto flex justify-center">
                <div className="w-full max-w-4xl px-4 sm:px-8">
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                    >
                        {courses.map((course) => (
                            <SwiperSlide key={course._id} className="relative flex flex-col items-center justify-center text-center p-4 bg-white shadow-lg rounded-lg">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full object-cover h-48 sm:h-56 lg:h-72 mb-4 rounded-md"
                                />
                                <h3 className="text-lg font-bold">{course.title}</h3>
                                <p className="text-sm mt-2">{course.description}</p>
                                <p className="text-sm mt-2 font-semibold">Price: ${course.price}</p>
                                <div className='rounded-md font-bold py-2 bg-orange-400 text-white px-4 absolute top-0 left-0'>
                                    Enrolled: {course.enrolled}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default PopularClass;
