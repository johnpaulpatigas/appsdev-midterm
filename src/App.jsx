import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("ecommerce-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ecommerce-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id,
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        let newQuantity =
          updatedCart[existingItemIndex].quantity + quantityToAdd;

        if (newQuantity > product.stock) {
          newQuantity = product.stock;
        }
        updatedCart[existingItemIndex].quantity = newQuantity;
        return updatedCart;
      } else {
        const initialQuantity =
          quantityToAdd > product.stock ? product.stock : quantityToAdd;
        return [...prevCart, { product, quantity: initialQuantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const safeQuantity = Math.max(
            1,
            Math.min(newQuantity, item.product.stock),
          );
          return { ...item, quantity: safeQuantity };
        }
        return item;
      }),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <Navbar totalCartItems={totalCartItems} />
        <main className="container mx-auto flex-grow p-4 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/appsdev-midterm/"
              element={<HomePage addToCart={addToCart} />}
            />
            <Route
              path="/appsdev-midterm/product/:id"
              element={<ProductDetailsPage addToCart={addToCart} cart={cart} />}
            />
            <Route
              path="/appsdev-midterm/cart"
              element={
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                  clearCart={clearCart}
                />
              }
            />
            <Route
              path="/appsdev-midterm/checkout"
              element={<CheckoutPage clearCart={clearCart} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
