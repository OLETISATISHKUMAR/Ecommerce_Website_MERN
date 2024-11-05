// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:8000/api/products/getall");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      extractCategories(data);
    };

    fetchProducts();
  }, []);

  const extractCategories = (data) => {
    const uniqueCategories = [...new Set(data.map(product => product.category))];
    setCategories(uniqueCategories);
  };

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart.`);
  };

  const handleBuyNow = (product) => {
    console.log(`Buying ${product.name} now.`);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    filterProducts(event.target.value, priceRange);
  };

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
    filterProducts(selectedCategory, event.target.value);
  };

  const filterProducts = (category, price) => {
    let updatedProducts = products;

    if (category) {
      updatedProducts = updatedProducts.filter(product => product.category === category);
    }

    if (price && price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      updatedProducts = updatedProducts.filter(product => product.price >= min && product.price <= max);
    }

    setFilteredProducts(updatedProducts);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Filter Section */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="mr-4 border rounded p-2"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={handlePriceChange}
          className="border rounded p-2"
        >
          <option value="all">All Prices</option>
          <option value="0-10000">Up to $10,000</option>
          <option value="10000-20000">$10,000 - $20,000</option>
          <option value="20000-30000">$20,000 - $30,000</option>
          <option value="30000-50000">$30,000 - $50,000</option>
          <option value="50000-100000">$50,000 and above</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border rounded overflow-hidden shadow-md">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-700">${product.price}</p>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </Link>
            <div className="p-4 flex space-x-4">
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleBuyNow(product)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
