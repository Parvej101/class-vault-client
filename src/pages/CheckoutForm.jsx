import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axiosSecure from '../hooks/useAxiosSecure';
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({amount}) => {
    const navigate = useNavigate()
const {user} = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return; // Stripe has not loaded yet
        }

        const cardElement = elements.getElement(CardElement);

        try {
            // Send the amount in cents (e.g., $10 -> 1000 cents)
            const { data } = await axiosSecure.post("/create-payment-intent", { amount: amount * 100 });

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
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Payment Successfull",
                    showConfirmButton: false,
                    timer: 1500
                  });
                console.log("Payment Intent:", paymentResult.paymentIntent);
               navigate('/')
            }
        } catch (error) {
            console.error("Payment error:", error.message);
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
                disabled={!stripe}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
                Pay ${amount}
            </button>
        </form>
    );
};

export default CheckoutForm;