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
        className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 mr-4"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover rounded-md shadow-sm"
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
        <div className="flex items-center mt-2">
          {product.discountPercentage > 0 && (
            <span className="text-gray-500 line-through mr-2">
              ${product.price.toFixed(2)}
            </span>
          )}
          <span className="text-gray-900 font-bold text-lg">
            ${priceToUse.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end sm:flex-row sm:items-center sm:space-x-4 ml-auto">
        <div className="flex items-center mb-2 sm:mb-0">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            className="p-1 border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="w-12 text-center border-t border-b border-gray-300 py-1"
          />
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            disabled={quantity >= product.stock}
            className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="text-red-600 hover:text-red-700 text-sm mt-1 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
