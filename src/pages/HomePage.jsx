import { useCallback, useEffect, useMemo, useState } from "react";
import FilterBar from "../components/FilterBar";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

const PRODUCTS_PER_PAGE = 12;

function HomePage({ addToCart }) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(9999);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://dummyjson.com/products?limit=100",
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllProducts(data.products);

        if (data.products.length > 0) {
          const prices = data.products.map((p) => p.price);
          const calculatedMin = Math.floor(Math.min(...prices));
          const calculatedMax = Math.ceil(Math.max(...prices));
          setMinPrice(calculatedMin);
          setMaxPrice(calculatedMax);
        }
      } catch (e) {
        console.error("Failed to fetch products:", e);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allProducts.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, [allProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          (product.brand &&
            product.brand.toLowerCase().includes(lowerCaseSearchTerm)),
      );
    }

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    result = result.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice,
    );

    result.sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-asc":
          return a.rating - b.rating;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [
    allProducts,
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, minPrice, maxPrice, sortOption]);

  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="mt-8 text-center text-lg text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col">
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOption={sortOption}
        setSortOption={setSortOption}
        categories={categories}
      />

      {filteredAndSortedProducts.length === 0 ? (
        <div className="mt-12 text-center text-xl text-gray-600">
          No products found matching your criteria.
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
          <Pagination
            productsPerPage={PRODUCTS_PER_PAGE}
            totalProducts={filteredAndSortedProducts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
}

export default HomePage;
