const categories = [
  {
    name: "Clothing",
    image:
      "https://img.freepik.com/free-photo/interior-clothing-store-with-stylish-merchandise-racks-fashionable-brand-design-casual-wear-modern-boutique-empty-fashion-showroom-shopping-centre-with-elegant-merchandise_482257-65537.jpg",
  },
  {
    name: "Electronics",
    image:
      "https://www.shutterstock.com/image-vector/electronics-text-assorted-devices-floating-260nw-2271252449.jpg",
  },
  {
    name: "Home & Garden",
    image:
      "https://media.designcafe.com/wp-content/uploads/2020/04/14090945/home-garden-design-images-for-a-long-summer-day.jpg",
  },
  {
    name: "Beauty",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnA1SvRCqcqOyBLE9Y43mhvOmc4jlEBcIDfQ&s",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        Featured Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover transition-transform transform group-hover:scale-110 duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-semibold text-lg">
                {category.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
