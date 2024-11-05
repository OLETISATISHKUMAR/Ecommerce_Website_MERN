import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden" aria-label={`Product card for ${product.name}`}>
      <Link to={`/product/${product._id}`} aria-label={`View details for ${product.name}`}>
        <img
          src={product.imageUrl}
          alt={product.name || "Product Image"} // Default alt text if product name is unavailable
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-700">${product.price}</p>
          <p className="text-gray-600 truncate">{product.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
