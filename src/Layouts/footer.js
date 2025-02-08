import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#69cea9] text-black py-6 w-full">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
          
          {/* About Us Section */}
          <div>
            <h5 className="text-lg font-semibold mb-2">About Us</h5>
            <p className="text-sm">
              Saini Medical Store has been serving the community for over 1 year. 
              We pride ourselves on providing high-quality medicines and excellent customer service.
            </p>
            <a href="/about" className="hover:underline text-sm mt-2 inline-block text-gray-700">
              More About Us
            </a>
          </div>

          {/* Social Links Section */}
          <div>
            <h5 className="text-lg font-semibold mb-2">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/bksarswal" target="_blank" rel="noopener noreferrer">
                <Facebook size={24} className="hover:text-blue-600" />
              </a>
              <a href="https://www.instagram.com/bksarswal" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} className="hover:text-pink-600" />
              </a>
             
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h5 className="text-lg font-semibold mb-2 ">Quick Links</h5>
            <ul className="text-sm space-y-2 ">
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
              <li><a href="#/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="#/terms&amp;Policy" className="hover:text-white">Terms & Policy</a></li>
              <li><a href="#/privacy&amp;Policy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

        </div>
      </div>

    

{/* Copyright Section */}
<div className="text-center text-sm py-4 border-t border-gray-700">
  <Link 
    to="https://bksarswal.netlify.app/" 
    className="inline-block px-3 py-1 rounded-md transition duration-300 hover:bg-yellow-300 hover:text-black"
  >
    © bksarswal. All rights reserved.
  </Link> 
</div>

    </footer>
  );
}
