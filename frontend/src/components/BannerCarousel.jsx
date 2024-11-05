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
      >
        <div className="relative">
          <img
            src="https://www.apple.com/v/iphone/home/bx/images/meta/iphone__kqge21l9n26q_og.png"
            alt="Banner 1"
            className="w-full h-96 object-cover rounded-lg shadow-md"
            style={{ width: '100%', height: '600px', objectFit: 'cover' }}
          />
          <p className="absolute bottom-5 left-5 text-white text-2xl font-semibold bg-black bg-opacity-50 p-2 rounded-md">Discover the latest trends</p>
        </div>
        <div className="relative">
          <img
            src="https://s3b.cashify.in/gpro/uploads/2021/12/07110930/Best-business-laptops.jpg"
            alt="Banner 2"
            className="w-full h-96 object-cover rounded-lg shadow-md"
            style={{ width: '100%', height: '600px', objectFit: 'cover' }}
          />
          <p className="absolute bottom-5 left-5 text-white text-2xl font-semibold bg-black bg-opacity-50 p-2 rounded-md">Amazing deals on top brands</p>
        </div>
        <div className="relative">
          <img
            src="https://e0.pxfuel.com/wallpapers/204/284/desktop-wallpaper-electronics-shopping-store-buy-home-kitchen-appliances-online-james-co.jpg"
            alt="Banner 3"
            className="w-full h-96 object-cover rounded-lg shadow-md"
            style={{ width: '100%', height: '600px', objectFit: 'cover' }}
          />
          <p className="absolute bottom-5 left-5 text-white text-2xl font-semibold bg-black bg-opacity-50 p-2 rounded-md">Shop the best collection</p>
        </div>
      </Carousel>
    </div>
  );
}

export default BannerCarousel;
