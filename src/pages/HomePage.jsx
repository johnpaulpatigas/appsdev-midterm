import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://dummyjson.com/products?limit=20");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (e) {
        console.error("Failed to fetch products:", e);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="mt-8 text-center text-lg text-red-600">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Our Products
      </h1>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="mt-12 text-center text-xl text-gray-600">
          No products found.
        </div>
      )}
    </div>
  );
}

export default HomePage;
