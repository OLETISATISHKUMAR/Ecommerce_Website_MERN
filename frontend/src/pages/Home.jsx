import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import BannerCarousel from "../components/BannerCarousel"; // Import the carousel component

function Home() {
  const [products, setProducts] = useState([]);
  const [featuredCategories, setFeaturedCategories] = useState([
    { name: "Clothing", image: "https://img.freepik.com/free-photo/interior-clothing-store-with-stylish-merchandise-racks-fashionable-brand-design-casual-wear-modern-boutique-empty-fashion-showroom-shopping-centre-with-elegant-merchandise_482257-65537.jpg" },
    { name: "Electronics", image: "https://www.shutterstock.com/image-vector/electronics-text-assorted-devices-floating-260nw-2271252449.jpg" },
    { name: "Home & Garden", image: "https://media.designcafe.com/wp-content/uploads/2020/04/14090945/home-garden-design-images-for-a-long-summer-day.jpg" },
  ]);
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      text: "Great products! Fast shipping!",
      author: "John Doe",
    },
    {
      id: 2,
      text: "Excellent customer service!",
      author: "Jane Smith",
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/products/getall"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Featured Categories Section */}
      <h2 className="text-xl font-bold mt-8 mb-4">Featured Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredCategories.map((category, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Product Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
