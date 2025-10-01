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
      <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-md">
        <p className="mb-4 text-2xl font-semibold text-gray-700">
          Your cart is empty.
        </p>
        <Link to="/appsdev-midterm/" className="text-blue-600 hover:underline">
          Start shopping!
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="rounded-3xl bg-white p-6 shadow-md lg:col-span-2">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">
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

      <div className="sticky top-28 h-fit rounded-3xl bg-white p-6 shadow-md lg:col-span-1">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Order Summary</h2>
        <div className="mb-2 flex items-center justify-between text-lg font-medium text-gray-700">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-medium text-gray-700">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-xl font-bold text-gray-900">
          <span>Total:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <Link
          to="/appsdev-midterm/checkout"
          className="mt-6 block w-full rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
        <Link
          to="/appsdev-midterm/"
          className="mt-4 block w-full rounded-xl border border-blue-600 px-4 py-2 text-center font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
