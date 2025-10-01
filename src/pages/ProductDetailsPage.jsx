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
    return <div className="mt-8 text-center text-lg text-red-600">{error}</div>;
  }

  if (!product) {
    return (
      <div className="mt-8 text-center text-lg text-gray-600">
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
    <div className="rounded-lg bg-white p-6 shadow-xl md:flex md:space-x-8">
      <div className="md:w-1/2">
        <img
          src={mainImage}
          alt={product.title}
          className="mb-4 h-auto max-h-[400px] w-full rounded-lg object-cover shadow-md"
        />
        {product.images && product.images.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.title} - ${index + 1}`}
                className={`h-20 w-20 cursor-pointer rounded-md border-2 object-cover transition-colors ${img === mainImage ? "border-blue-500" : "border-gray-200 hover:border-blue-300"}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 md:mt-0 md:w-1/2">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {product.title}
        </h1>
        <p className="mb-2 text-sm text-gray-600">
          Category:{" "}
          <span className="font-medium">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </span>
        </p>
        <p className="mt-4 text-lg text-gray-700">{product.description}</p>

        <div className="mt-4 flex items-center">
          {hasDiscount ? (
            <div className="flex items-baseline space-x-2">
              <span className="text-xl text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-3xl font-bold text-red-600">
                ${discountedPrice}
              </span>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-gray-900">
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
                  ? "ml-1 font-semibold text-red-500"
                  : "ml-1 font-semibold text-green-600"
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

        <div className="mt-6 flex items-center space-x-4">
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
            className="w-20 rounded-md border border-gray-300 p-2 text-center focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={handleAddToCart}
            disabled={
              isOutOfStock || quantity === 0 || maxPurchaseableQuantity === 0
            }
            className={`flex-grow rounded-md px-6 py-3 font-semibold text-white transition-colors ${
              isOutOfStock || quantity === 0 || maxPurchaseableQuantity === 0
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>

        {notification && (
          <div className="animate-fade-in-down mt-4 rounded-md bg-green-100 p-3 text-center text-green-800">
            {notification}
          </div>
        )}

        {maxPurchaseableQuantity === 0 && !isOutOfStock && itemInCart && (
          <div className="mt-4 rounded-md bg-yellow-100 p-3 text-center text-sm text-yellow-800">
            You have {itemInCart.quantity} of this item in your cart (Max stock
            reached).
          </div>
        )}

        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Customer Reviews
            </h2>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                >
                  <StarRating rating={review.rating} />
                  <p className="mt-2 text-gray-800">{review.comment}</p>
                  <p className="mt-1 text-sm text-gray-500">
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
