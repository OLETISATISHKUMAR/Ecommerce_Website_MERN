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
    console.log(`Added ${product.name} to cart.`);
  };

  const handleBuyNow = () => {
    console.log(`Buying ${product.name} now.`);
  };

  return (
    <div className="container mx-auto p-4">
      {product ? (
        <div className="flex flex-col lg:flex-row lg:h-screen gap-6">
          {/* Image Section */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto max-h-[80vh] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Product Details Section */}
          <div className="lg:w-1/2 flex flex-col justify-evenly">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">{product.name}</h1>
              <p className="text-lg text-blue-600 font-semibold mb-3">${product.price.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-md shadow-sm hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-500 text-white py-2 rounded-md shadow-sm hover:bg-green-600 transition"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-2">
              <h2 className="text-xl font-medium text-gray-800 mb-2">Customer Reviews</h2>
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-600">"Great quality, fast shipping!"</p>
                  <p className="text-xs font-medium text-gray-700 mt-1">- Jane Doe</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-600">"Amazing product for the price!"</p>
                  <p className="text-xs font-medium text-gray-700 mt-1">- John Smith</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-600">"Exactly as described. Very satisfied."</p>
                  <p className="text-xs font-medium text-gray-700 mt-1">- Emily Clark</p>
                </div>
              </div>
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
