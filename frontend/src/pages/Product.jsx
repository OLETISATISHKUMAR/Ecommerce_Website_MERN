// src/pages/Product.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:8000/api/products/get-product/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Add your logic to handle adding to cart
    console.log(`Added ${product.name} to cart.`);
  };

  const handleBuyNow = () => {
    // Add your logic to handle immediate purchase
    console.log(`Buying ${product.name} now.`);
  };

  return (
    <div className="container mx-auto p-4">
      {product ? (
        <div className="flex flex-col md:flex-row">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full md:w-1/2 object-cover rounded"
          />
          <div className="md:ml-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-700 mt-2">${product.price}</p>
            <p className="text-gray-600 mt-4">{product.description}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
}

export default Product;
