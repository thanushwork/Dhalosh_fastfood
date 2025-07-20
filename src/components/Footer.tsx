import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-300">7299760102 / 9840650939</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-300">info@dhaloeshfastfood.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-gray-300 text-sm mb-2">DHALOESH FAST FOOD</p>
                  <a 
                    href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-orange-400 hover:text-orange-300 transition-colors text-sm"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-orange-400 mb-4">Find Us</h3>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ab7f3b5c1d%3A0x5b1b5c1d7f3b5c1d!2sDhaloesh%20Fast%20Food!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg filter brightness-90 hover:brightness-100 transition-all duration-300"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                <a 
                  href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <div className="flex items-center space-x-3">
                <div className="bg-orange-600 p-2 rounded-lg">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    <path d="M8.5 11.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z"/>
                    <circle cx="12" cy="8" r="2"/>
                    <path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-orange-400">DHALOESH FAST FOOD</h2>
              </div>
              <p className="text-gray-400 text-sm">Quick Bites • Parcel Only • No Delivery</p>
            </div>
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 DHALOESH FAST FOOD. All rights reserved.</p>
              <p>Order • Pay • Collect • Skip the Queue</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;