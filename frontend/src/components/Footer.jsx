import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
     

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3"></div>
              <h3 className="text-2xl font-bold">KixVault</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your ultimate destination for the freshest sneakers and streetwear. From limited editions to everyday essentials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-200">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-200">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Men's Sneakers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Women's Sneakers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Kids' Sneakers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Limited Edition</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Sale</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Accessories</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Track Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Gift Cards</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400">
                  123 Sneaker Street<br />
                  Downtown, NY 10001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400 flex-shrink-0" />
                <p className="text-gray-400">(555) 123-KICK</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400 flex-shrink-0" />
                <p className="text-gray-400">hello@kixvault.com</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-300 mb-2">Store Hours:</p>
              <p className="text-sm text-gray-400">Mon-Sat: 10AM-9PM</p>
              <p className="text-sm text-gray-400">Sunday: 12PM-6PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-gray-400 text-sm">© 2025 KixVault. All rights reserved.</p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Cookies</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">We Accept:</p>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-xs font-bold">V</div>
                <div className="w-8 h-5 bg-red-600 rounded flex items-center justify-center text-xs font-bold">M</div>
                <div className="w-8 h-5 bg-blue-500 rounded flex items-center justify-center text-xs font-bold">A</div>
                <div className="w-8 h-5 bg-yellow-500 rounded flex items-center justify-center text-xs font-bold text-black">P</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}