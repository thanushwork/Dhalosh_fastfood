import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Clock, Star, Utensils, Shield, CreditCard, Smartphone, Award, Users, Heart, CheckCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const businessHours = [
    { day: 'Monday - Friday', hours: '10:00 AM - 10:00 PM' },
    { day: 'Saturday - Sunday', hours: '10:00 AM - 11:00 PM' },
  ];

  const features = [
    { icon: Shield, text: 'Secure Payments' },
    { icon: Clock, text: 'Quick Pickup' },
    { icon: CreditCard, text: 'UPI Accepted' },
    { icon: Smartphone, text: 'Online Ordering' },
  ];

  const certifications = [
    { icon: Award, text: 'FSSAI Certified' },
    { icon: Users, text: '500+ Happy Customers' },
    { icon: Star, text: '4.8 Star Rating' },
    { icon: Heart, text: 'Made with Love' },
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Contact Information */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">DHALOESH</h3>
                <p className="text-orange-400 text-sm font-medium">FAST FOOD</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Authentic chicken & beef varieties with modern online ordering. 
              Quick bites for busy people with traditional taste.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Call Us</p>
                  <p className="text-gray-300 text-sm">7299760102 / 9840650939</p>
                  <p className="text-green-400 text-xs">Available 10 AM - 10 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Email</p>
                  <p className="text-gray-300 text-sm">info@dhaloeshfastfood.com</p>
                  <p className="text-blue-400 text-xs">Quick Response</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Location</p>
                  <p className="text-gray-300 text-sm mb-1">DHALOESH FAST FOOD</p>
                  <a 
                    href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors text-xs"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-6 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Business Hours
            </h3>
            <div className="space-y-3 mb-6">
              {businessHours.map((schedule, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <p className="font-semibold text-white text-sm">{schedule.day}</p>
                  <p className="text-green-400 text-sm">{schedule.hours}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
              <p className="text-orange-400 font-semibold text-sm mb-1">🍽️ Service Type</p>
              <p className="text-white text-sm">Parcel Only - No Delivery</p>
              <p className="text-gray-400 text-xs">Order online, skip the queue!</p>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-6">Why Choose Us</h3>
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{feature.text}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <cert.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{cert.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-6 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Find Us
            </h3>
            <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ab7f3b5c1d%3A0x5b1b5c1d7f3b5c1d!2sDhaloesh%20Fast%20Food!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg filter brightness-90 hover:brightness-100 transition-all duration-300 border border-gray-700"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                <a 
                  href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="border-t border-gray-700 pt-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-6">Get notified about new menu items, special offers, and restaurant updates.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                />
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex justify-center lg:justify-end space-x-4">
                <a href="#" className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg hover:scale-110 transition-transform">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-lg hover:scale-110 transition-transform">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg hover:scale-110 transition-transform">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.085"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-lg">
                <Utensils className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  DHALOESH FAST FOOD
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>FSSAI Certified</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>4.8 Rating</span>
                  </div>
                  <span>•</span>
                  <span>Est. 2020</span>
                </div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="text-gray-400 text-sm space-y-1">
                <p>&copy; 2024 DHALOESH FAST FOOD. All rights reserved.</p>
                <p className="text-orange-400 font-medium">🍽️ Order • 💳 Pay • 📦 Collect • ⚡ Skip the Queue</p>
                <div className="flex justify-center lg:justify-end items-center space-x-4 mt-2">
                  <span className="text-xs">Powered by</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="h-3 w-3 text-red-500" />
                    <span className="text-xs font-medium">Modern Technology</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;