import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      aria-label={`Product card for ${product.name}`}
    >
      <Link to={`/product/${product._id}`} aria-label={`View details for ${product.name}`}>
        <div className="relative group">
          <img
            src={product.imageUrl}
            alt={product.name || "Product Image"}
            className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <button className="absolute bottom-4 left-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 text-sm font-semibold rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            View Details
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
          <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mt-1 text-sm truncate" aria-label={`Product description: ${product.description}`}>
            {product.description || "No description available"}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
