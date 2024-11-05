import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-600">
              We are committed to providing the best online shopping experience. Our mission is to deliver quality products at unbeatable prices.
            </p>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="text-gray-600">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe to our Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Get the latest updates and special offers.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-lg w-full mb-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-500">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
