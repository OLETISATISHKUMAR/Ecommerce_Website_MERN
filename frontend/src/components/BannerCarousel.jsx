import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function BannerCarousel() {
  return (
    <div className="w-full mx-auto mt-4">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
        className="rounded-lg overflow-hidden shadow-xl"
      >
        {/* Banner Slide 1 */}
        <div className="relative group">
          <img
            src="https://www.apple.com/v/iphone/home/bx/images/meta/iphone__kqge21l9n26q_og.png"
            alt="Banner 1"
            className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300"></div>
          <p className="absolute bottom-10 left-10 text-white text-3xl font-semibold bg-black bg-opacity-60 p-4 rounded-md shadow-lg transition-opacity duration-300 group-hover:opacity-90">
            Discover the latest trends
          </p>
        </div>

        {/* Banner Slide 2 */}
        <div className="relative group">
          <img
            src="https://s3b.cashify.in/gpro/uploads/2021/12/07110930/Best-business-laptops.jpg"
            alt="Banner 2"
            className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300"></div>
          <p className="absolute bottom-10 left-10 text-white text-3xl font-semibold bg-black bg-opacity-60 p-4 rounded-md shadow-lg transition-opacity duration-300 group-hover:opacity-90">
            Amazing deals on top brands
          </p>
        </div>

        {/* Banner Slide 3 */}
        <div className="relative group">
          <img
            src="https://e0.pxfuel.com/wallpapers/204/284/desktop-wallpaper-electronics-shopping-store-buy-home-kitchen-appliances-online-james-co.jpg"
            alt="Banner 3"
            className="w-full h-[600px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition duration-300"></div>
          <p className="absolute bottom-10 left-10 text-white text-3xl font-semibold bg-black bg-opacity-60 p-4 rounded-md shadow-lg transition-opacity duration-300 group-hover:opacity-90">
            Shop the best collection
          </p>
        </div>
      </Carousel>
    </div>
  );
}

export default BannerCarousel;
