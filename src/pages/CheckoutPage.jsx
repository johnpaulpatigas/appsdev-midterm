import { useEffect } from "react";
import { Link } from "react-router-dom";

function CheckoutPage({ clearCart }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart();
    }, 1000);

    return () => clearTimeout(timer);
  }, [clearCart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you for your purchase.
        </p>
        <p className="text-gray-600 mb-8">
          Your order details have been sent to your email.
        </p>
        <Link
          to="/appsdev-midterm/"
          className="bg-blue-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPage;
