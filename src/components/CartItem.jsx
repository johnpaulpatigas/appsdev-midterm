import { Link } from "react-router-dom";

function CartItem({ item, removeFromCart, updateQuantity }) {
  const { product, quantity } = item;
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;
  const priceToUse =
    product.discountPercentage > 0 ? discountedPrice : product.price;

  return (
    <div className="flex items-center border-b border-gray-200 py-4 last:border-b-0">
      <Link
        to={`/appsdev-midterm/product/${product.id}`}
        className="mr-4 h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full rounded-3xl object-cover shadow-sm"
        />
      </Link>
      <div className="flex-grow">
        <Link
          to={`/appsdev-midterm/product/${product.id}`}
          className="text-lg font-semibold text-gray-800 hover:text-blue-600"
        >
          {product.title}
        </Link>
        <p className="text-sm text-gray-600">Brand: {product.brand}</p>
        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
        <div className="mt-2 flex items-center">
          {product.discountPercentage > 0 && (
            <span className="mr-2 text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-lg font-bold text-gray-900">
            ${priceToUse.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="ml-auto flex flex-col items-end sm:flex-row sm:items-center sm:space-x-4">
        <div className="mb-2 flex items-center sm:mb-0">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            className="rounded-l-md border border-gray-300 p-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              updateQuantity(product.id, parseInt(e.target.value, 10))
            }
            min="1"
            max={product.stock}
            className="w-12 border-t border-b border-gray-300 py-1 text-center"
          />
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stock}
            className="rounded-r-md border border-gray-300 p-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-lg font-semibold text-gray-900">
            ${(priceToUse * quantity).toFixed(2)}
          </span>
          <button
            onClick={() => removeFromCart(product.id)}
            className="mt-1 text-sm text-red-600 transition-colors hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
