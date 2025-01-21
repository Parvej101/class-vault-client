
import { motion } from "framer-motion";
const Wellcome = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-900">
            <motion.div
                className="text-center p-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {/* Heading */}
                <motion.h1
                    className="text-5xl md:text-7xl font-bold text-white mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    Welcome to <span className="text-orange-500">Dashboard</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    className="text-lg md:text-2xl text-gray-300"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                    }}
                >
                    Your personalized space for insights and management.
                </motion.p>

                {/* Rotating Circle */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-500 rounded-full opacity-20 -z-10"
                    style={{ transform: "translate(-50%, -50%)" }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Wellcome;