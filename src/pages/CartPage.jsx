import { useMemo } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage({ cart, removeFromCart, updateQuantity }) {
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const discountedPrice =
        item.product.price -
        (item.product.price * item.product.discountPercentage) / 100;
      const priceToUse =
        item.product.discountPercentage > 0
          ? discountedPrice
          : item.product.price;
      return sum + priceToUse * item.quantity;
    }, 0);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md mt-8">
        <p className="text-2xl font-semibold text-gray-700 mb-4">
          Your cart is empty.
        </p>
        <Link to="/appsdev-midterm/" className="text-blue-600 hover:underline">
          Start shopping!
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Shopping Cart ({cart.length} items)
        </h1>
        <div className="divide-y divide-gray-200">
          {cart.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit sticky top-28">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        <div className="flex justify-between items-center text-lg font-medium text-gray-700 mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center text-lg font-medium text-gray-700 mb-4">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center text-xl font-bold text-gray-900">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <Link
          to="/appsdev-midterm/checkout"
          className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md text-center font-semibold hover:bg-blue-700 transition-colors block"
        >
          Proceed to Checkout
        </Link>
        <Link
          to="/appsdev-midterm/"
          className="mt-4 w-full text-blue-600 border border-blue-600 py-2 px-4 rounded-md text-center font-semibold hover:bg-blue-50 transition-colors block"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
