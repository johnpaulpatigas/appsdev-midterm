import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/appsdev-midterm" className="text-2xl font-bold">
          Alibuy
        </Link>
        <div className="space-x-4">
          <Link to="/appsdev-midterm" className="hover:underline">
            Products
          </Link>
          <Link to="/appsdev-midterm/cart" className="hover:underline">
            Cart (0)
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
