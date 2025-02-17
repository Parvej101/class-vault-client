import { useState } from "react";

import { useSpring, animated, useTransition } from 'react-spring';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const fadeIn = useSpring({
        opacity: activeIndex !== null ? 1 : 0,
        transform: activeIndex !== null ? 'translateY(0)' : 'translateY(-20px)',
    });

    const questionsAndAnswers = [
        {
            question: "What is ClassVault?",
            answer:
                "ClassVault is a platform for skill development and learning that connects tutors, students, and educational institutions to facilitate seamless learning experiences.",
        },
        {
            question: "How do I become a tutor?",
            answer:
                "To become a tutor, create an account, fill out your profile, and start creating classes or live sessions. Once approved, you can begin teaching!",
        },
        {
            question: "Is there a fee to use the platform?",
            answer:
                "ClassVault offers both free and paid options. The free version allows access to basic features, while premium plans unlock additional tools for teachers and learners.",
        },
        {
            question: "Can I set my schedule as a tutor?",
            answer:
                "Absolutely! You can set your own availability, and students can book your classes according to your schedule.",
        },
        {
            question: "Can students contact me directly?",
            answer:
                "Yes, students can message you through the platform, or they can book individual sessions if they need more personalized help.",
        },
    ];
    return (
       <section className="">
         <div className="container mx-auto px-4 py-8 ">
            <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">Frequently Asked Questions</h2>

            <div className="space-y-6">
                {questionsAndAnswers.map((item, index) => (
                    <div key={index} className="border-b pb-4">
                        <div
                            onClick={() => toggleFAQ(index)}
                            className="cursor-pointer text-lg font-medium text-orange-600 hover:text-orange-800"
                        >
                            {item.question}
                        </div>

                        {/* Animated FAQ Answer */}
                        {activeIndex === index && (
                            <animated.div
                                style={fadeIn}
                                className="mt-4 text-orange-300 text-base transition-all"
                            >
                                <p>{item.answer}</p>
                            </animated.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
       </section>
    );
};

export default Faq;