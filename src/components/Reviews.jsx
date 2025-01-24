import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'font-awesome/css/font-awesome.min.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';
import Rating from "react-rating";


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
          .then((res) => res.json())
          .then((data) => setReviews(data))
          .catch((error) => console.error('Error fetching feedbacks:', error));
      }, []);
    return (
        <div className="bg-gray-100 py-10 px-5 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Top Reviews from Our Learners
        </h2>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {reviews.map((review, index) => (
             <SwiperSlide key={index} className="flex flex-col items-center text-center">
             <div className="bg-white p-6 rounded-lg shadow-lg w-10/12 mx-auto">
               <img
                 src={review.image}
                 alt={review.name}
                 className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-200"
               />
               <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
               <p className="text-sm text-gray-600 italic">{review.title}</p>
               <div className="flex justify-center mt-2">
                 <Rating
                   initialRating={review.rating}
                   readonly
                   emptySymbol="fa fa-star-o fa-2x text-gray-400" // Empty star class
                   fullSymbol="fa fa-star fa-2x text-yellow-500" // Filled star class
                 />
               </div>
               <p className="my-4 text-gray-700">{review.review}</p>
             </div>
           </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
};

export default Reviews;