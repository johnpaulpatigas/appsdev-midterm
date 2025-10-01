import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import StarRating from "../components/StarRating";

function ProductDetailsPage({ addToCart, cart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
        setMainImage(data.thumbnail);
        setQuantity(1);
      } catch (e) {
        console.error("Failed to fetch product details:", e);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setNotification(`Added ${quantity} x ${product.title} to cart!`);
    }
  };

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    if (value > product.stock) {
      value = product.stock;
    }
    setQuantity(value);
  };

  const itemInCart = cart.find((item) => item.product.id === product?.id);
  const maxPurchaseableQuantity = product
    ? product.stock - (itemInCart?.quantity || 0)
    : 0;
  const isOutOfStock = product?.stock === 0;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-600 text-lg mt-8">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 text-lg mt-8">
        Product not found.
      </div>
    );
  }

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl md:flex md:space-x-8">
      <div className="md:w-1/2">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg mb-4 shadow-md max-h-[400px]"
        />
        {product.images && product.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} - ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md border-2 cursor-pointer transition-colors
                            ${img === mainImage ? "border-blue-500" : "border-gray-200 hover:border-blue-300"}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="md:w-1/2 mt-6 md:mt-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.title}
        </h1>
        <p className="text-gray-600 text-sm mb-2">
          Category:{" "}
          <span className="font-medium">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </span>
        </p>
        <p className="text-gray-700 text-lg mt-4">{product.description}</p>

        <div className="flex items-center mt-4">
          {hasDiscount ? (
            <div className="flex items-baseline space-x-2">
              <span className="text-gray-500 line-through text-xl">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-red-600 font-bold text-3xl">
                ${discountedPrice}
              </span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            </div>
          ) : (
            <span className="text-gray-900 font-bold text-3xl">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-4">
          <StarRating rating={product.rating} />
        </div>

        <div className="mt-4 text-gray-600">
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Availability:</strong>
            <span
              className={
                isOutOfStock
                  ? "text-red-500 font-semibold ml-1"
                  : "text-green-600 font-semibold ml-1"
              }
            >
              {product.availabilityStatus} ({product.stock} in stock)
            </span>
          </p>
          <p>
            <strong>Weight:</strong> {product.weight} kg
          </p>
          <p>
            <strong>Dimensions:</strong> {product.dimensions.width}x
            {product.dimensions.height}x{product.dimensions.depth} cm
          </p>
          <p>
            <strong>Warranty:</strong> {product.warrantyInformation}
          </p>
          <p>
            <strong>Shipping:</strong> {product.shippingInformation}
          </p>
          <p>
            <strong>Return Policy:</strong> {product.returnPolicy}
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <label htmlFor="quantity" className="font-medium text-gray-700">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={isOutOfStock || maxPurchaseableQuantity === 0}
            className="w-20 p-2 border border-gray-300 rounded-md text-center focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={handleAddToCart}
            disabled={
              isOutOfStock || quantity === 0 || maxPurchaseableQuantity === 0
            }
            className={`flex-grow py-3 px-6 rounded-md text-white font-semibold transition-colors
              ${
                isOutOfStock || quantity === 0 || maxPurchaseableQuantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        {notification && (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md text-center animate-fade-in-down">
            {notification}
          </div>
        )}

        {maxPurchaseableQuantity === 0 && !isOutOfStock && itemInCart && (
          <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md text-center text-sm">
            You have {itemInCart.quantity} of this item in your cart (Max stock
            reached).
          </div>
        )}

        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                >
                  <StarRating rating={review.rating} />
                  <p className="text-gray-800 mt-2">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    By {review.reviewerName} on{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
