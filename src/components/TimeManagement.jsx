import { FaReact, FaJsSquare, FaDatabase } from "react-icons/fa"; // Example technology icons
import { useSpring, animated } from "react-spring";
import Clock from "react-clock"; // Import the analog clock
import "react-clock/dist/Clock.css"; // Optional for default styles

const TimeManagement = () => {
    const rotateIcons = useSpring({
        loop: true,
        to: { transform: "rotate(0deg)" },
        from: { transform: "rotate(5deg)" },
        config: { duration: 5000 }, // Adjust time for full rotation
    });
    return (
        <div className="bg-gray-900 text-white p-10 rounded-lg shadow-lg relative overflow-hidden">
            <div className="flex flex-col items-center space-y-8">
                {/* Title Section */}
                <div className="text-center text-3xl font-bold">
                    <h2>Time Management</h2>
                    <p className="text-lg mt-2">Master your time with the right tools and techniques</p>
                </div>

                {/* Icons animation around the clock */}
                <animated.div
                    style={rotateIcons}
                    className="absolute top-32 left-32 transform -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="relative flex items-center justify-center space-x-12">
                        {/* Icons are placed around the clock */}
                        <div className="absolute left-20 top-0">
                            <FaJsSquare className="text-6xl text-yellow-500" />
                            <span className="mt-2 text-center">JavaScript</span>
                        </div>
                        <div className="absolute left-60 top-10">
                            <FaReact className="text-6xl text-yellow-500" />
                            <span className="mt-2 text-center">React</span>
                        </div>
                        <div className="absolute left-0 -top-10">
                            <FaDatabase className="text-6xl text-yellow-500" />
                            <span className="mt-2 text-center">MongoDB</span>
                        </div>
                    </div>
                </animated.div>
                

                {/* Analog Clock */}
                <div className="relative flex justify-center items-center">
                    <Clock value={new Date()} size={400} renderNumbers={true} />
                </div>

                {/* Time Management Tips */}
                <div className="text-center mt-8 max-w-xl mx-auto">
                    <p className="text-lg">
                        Effective time management is key to mastering your workflow. With tools like JavaScript for logic, React for front-end
                        management, and MongoDB for data management, you can build efficient, scalable applications. Don't forget to take regular breaks
                        and stay focused with proper time tracking!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TimeManagement;