import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axiosSecure from '../hooks/useAxiosSecure';
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CheckoutForm = ({ course }) => {

    const navigate = useNavigate()
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) {
            return; // Stripe has not loaded yet
        }
        setIsSubmitting(true); // Disable the button to prevent duplicate submissions

        const cardElement = elements.getElement(CardElement);

        try {
            // Send the amount in cents (e.g., $10 -> 1000 cents)
            const { data } = await axiosSecure.post("/create-payment-intent", { amount: course.price * 100 });

            // Make sure we get the correct clientSecret
            const { clientSecret } = data;
            if (!clientSecret) {
                console.error('No clientSecret received');
                alert("Error: No client secret returned from server");
                return;
            }

            // Confirm the payment using Stripe
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            });

            if (paymentResult.error) {
                console.error(paymentResult.error.message);
                alert("Payment failed: " + paymentResult.error.message);
            } else if (paymentResult.paymentIntent.status === "succeeded") {
                const paymentData = {
                    email: user?.email,
                    transactionId: paymentResult.paymentIntent.id,
                    date: new Date().toISOString(),
                    title: course.title,
                    instructorName: course.name,
                    image: course.image,
                    courseId: course._id
                };
                // send payment data to the server
                try {
                    // Send payment data to the server and handle possible duplicate enrollment
                    const response = await axiosSecure.post('/enrollCourse', paymentData);
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    console.log("Payment Intent:", paymentResult.paymentIntent);
                    navigate('/dashboard/myEnroll');
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        // Handle the 400 error for duplicate enrollment
                        Swal.fire({
                            position: "center",
                            icon: "warning",
                            title: "You are already enrolled in this course.",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    } else {
                        // Handle any other errors
                        console.error("Error saving payment info:", error.message);
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "An error occurred. Please try again.",
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                }
            }
        } catch (error) {
            console.error("Payment error:", error.message);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "An error occurred. Please try again.",
                showConfirmButton: false,
                timer: 2000
            });
        } finally {
            setIsSubmitting(false); // Re-enable the button after processing
        }
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#32325d",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#fa755a",
                        },
                    },
                }}
            />
            <button
                type="submit"
                disabled={!stripe || isSubmitting}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
                Pay ${course.price}
            </button>
        </form>
    );
};

export default CheckoutForm;