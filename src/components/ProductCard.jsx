import { Link } from "react-router-dom";
import StarRating from "./StarRating";

function ProductCard({ product }) {
  const { id, title, thumbnail, price, discountPercentage, rating, stock } =
    product;
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2,
  );
  const hasDiscount = discountPercentage > 0;
  const isOutOfStock = stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <Link
        to={`/appsdev-midterm/product/${id}`}
        className="block h-48 sm:h-56 overflow-hidden"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex-grow">
          <Link
            to={`/appsdev-midterm/product/${id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h3>
        <div className="flex items-center justify-between mb-2">
          {hasDiscount ? (
            <div className="flex flex-col">
              <span className="text-gray-500 line-through text-sm">
                ${price.toFixed(2)}
              </span>
              <span className="text-red-600 font-bold text-lg">
                ${discountedPrice}
              </span>
            </div>
          ) : (
            <span className="text-gray-900 font-bold text-lg">
              ${price.toFixed(2)}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              -{discountPercentage.toFixed(0)}%
            </span>
          )}
        </div>
        <div className="mb-3">
          <StarRating rating={rating} />
        </div>
        {isOutOfStock ? (
          <button
            className="w-full bg-gray-400 text-white py-2 px-4 rounded-md text-sm font-medium cursor-not-allowed"
            disabled
          >
            Out of Stock
          </button>
        ) : (
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
            Add to Cart (Coming Soon)
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
