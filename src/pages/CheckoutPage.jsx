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
    <div className="flex min-h-[calc(100vh-160px)] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-6 h-16 w-16 text-green-500"
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
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>
        <p className="mb-6 text-lg text-gray-700">
          Thank you for your purchase.
        </p>
        <p className="mb-8 text-gray-600">
          Your order details have been sent to your email.
        </p>
        <Link
          to="/appsdev-midterm/"
          className="rounded-xl bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPage;
