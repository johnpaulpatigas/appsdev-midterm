import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="container mx-auto flex-grow p-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/appsdev-midterm/" element={<HomePage />} />
            <Route
              path="/appsdev-midterm/product/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/appsdev-midterm/cart" element={<CartPage />} />
            <Route
              path="/appsdev-midterm/checkout"
              element={<CheckoutPage />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
