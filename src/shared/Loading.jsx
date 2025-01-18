import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-orange-50 to-yellow-100">
      <motion.div
        className="w-24 h-24 border-8 border-t-8 border-gray-200 rounded-full"
        style={{ borderTopColor: "#FF5733" }} // Optional: Customize color
        animate={{
          rotate: 360,  // Infinite rotation
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          },
        }}
      />
    </div>
    );
};

export default Loading;