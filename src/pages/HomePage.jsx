import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

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
      <h1 className="mb-6 text-center text-3xl font-bold">Our Products</h1>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <li key={product.id} className="rounded bg-white p-4 shadow-sm">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="mt-2 h-24 w-24 object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
