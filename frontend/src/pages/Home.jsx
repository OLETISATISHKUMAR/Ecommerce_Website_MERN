import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import BannerCarousel from "../components/BannerCarousel";
import FeaturedCategories from "../components/FeaturedCategories";
import SpecialOffers from "../components/SpecialOffers";
import Testimonials from "../components/Testimonials";

function Home() {
  const [products, setProducts] = useState([]);

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

      <SpecialOffers />
      <FeaturedCategories />

      {/* Product Section */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Testimonials />
    </div>
  );
}

export default Home;
