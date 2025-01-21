
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const Payemnt = () => {
    const location = useLocation()
    const amount = location.state;

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-center mb-4">Payment</h1>
            <div className="mb-6">
                <p className="text-xl font-bold mt-2">Amount: ${amount}</p>
            </div>
            {/* Wrap CheckoutForm with Elements and pass stripePromise */}
            <Elements stripe={stripePromise}>
                <CheckoutForm amount={amount} />
            </Elements>
        </div>
    </div>
    );
};

export default Payemnt;