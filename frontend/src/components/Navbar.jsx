import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          E-Commerce
        </Link>
        <div className="flex items-center space-x-6">
          {/* Always show these links */}
          <Link to="/" className="text-lg text-white hover:text-gray-200 transition duration-300">Home</Link>
          <Link to="/products" className="text-lg text-white hover:text-gray-200 transition duration-300">Products</Link>
          <Link to="/about" className="text-lg text-white hover:text-gray-200 transition duration-300">About</Link>

          {/* Show additional links only if the user is logged in */}
          {token ? (
            <>
              <Link to="/cart" className="text-lg text-white hover:text-gray-200 transition duration-300">Cart</Link>
              <Link to="/orders" className="text-lg text-white hover:text-gray-200 transition duration-300">Orders</Link>
              <Link to="/contact" className="text-lg text-white hover:text-gray-200 transition duration-300">Contact</Link>
              <button onClick={handleLogout} className="text-lg text-white hover:text-gray-200 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg text-white hover:text-gray-200 transition duration-300">Login</Link>
              <Link to="/register" className="text-lg text-white hover:text-gray-200 transition duration-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
