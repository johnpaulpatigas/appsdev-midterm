import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { id, title, thumbnail, price, discountPercentage } = product;
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2,
  );
  const hasDiscount = discountPercentage > 0;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <Link
        to={`/appsdev-midterm/product/${id}`}
        className="block h-48 overflow-hidden sm:h-56"
      >
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="flex flex-grow flex-col p-4">
        <h3 className="mb-2 flex-grow text-lg font-semibold text-gray-900">
          <Link
            to={`/appsdev-midterm/product/${id}`}
            className="transition-colors hover:text-blue-600"
          >
            {title}
          </Link>
        </h3>
        <div className="mb-2 flex items-center justify-between">
          {hasDiscount ? (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
              <span className="text-lg font-bold text-red-600">
                ${discountedPrice}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              -{discountPercentage.toFixed(0)}%
            </span>
          )}
        </div>

        <button className="w-full cursor-not-allowed rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
          Add to Cart (Coming Soon)
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
