import { Link } from "react-router-dom";

function Navbar({ totalCartItems }) {
  return (
    <nav className="sticky top-0 z-50 bg-white p-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          to="/appsdev-midterm/"
          className="text-2xl font-bold text-gray-800 transition-colors hover:text-blue-600"
        >
          Alibuy
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/appsdev-midterm/"
            className="text-gray-600 transition-colors hover:text-blue-600"
          >
            Products
          </Link>
          <Link
            to="/appsdev-midterm/cart"
            className="relative text-gray-600 transition-colors hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
