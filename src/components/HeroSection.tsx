import React from 'react';
import { Clock, Star, MapPin, Phone } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative gradient-orange text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-500/10 to-red-600/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slideInLeft">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Delicious Food,<br />
              <span className="text-yellow-300 animate-bounce-custom inline-block">Quick Pickup</span>
            </h1>
            <p className="text-xl mb-8 text-orange-100 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              Authentic chicken & beef varieties • Order online, skip the queue
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4 hover-lift backdrop-blur-sm">
                <Clock className="h-6 w-6 text-yellow-300" />
                <div>
                  <p className="font-semibold">Quick Pickup</p>
                  <p className="text-sm text-orange-100">15-20 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg p-4 hover-lift backdrop-blur-sm">
                <Star className="h-6 w-6 text-yellow-300" />
                <div>
                  <p className="font-semibold">4.8 Rating</p>
                  <p className="text-sm text-orange-100">500+ Reviews</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <button 
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 hover:shadow-xl btn-modern animate-glow"
              >
                Order Now
              </button>
              <a 
                href="tel:7299760102"
                className="flex items-center space-x-3 text-orange-100 hover:text-white transition-all duration-300 bg-white/10 px-6 py-4 rounded-xl backdrop-blur-sm hover:bg-white/20 group"
              >
                <Phone className="h-5 w-5" />
                <div>
                  <p className="font-semibold">Call Now</p>
                  <p className="text-sm">7299760102</p>
                </div>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-slideInRight">
            <img
              src="https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Chicken Rice"
              className="rounded-2xl shadow-xl hover:scale-105 transition-all duration-500 hover-lift hover:shadow-2xl"
            />
            <img
              src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Chicken 65"
              className="rounded-2xl shadow-xl hover:scale-105 transition-all duration-500 mt-8 hover-lift hover:shadow-2xl"
            />
            <img
              src="https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Beef Curry"
              className="rounded-2xl shadow-xl hover:scale-105 transition-all duration-500 -mt-8 hover-lift hover:shadow-2xl"
            />
            <img
              src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Chicken Lollipop"
              className="rounded-2xl shadow-xl hover:scale-105 transition-all duration-500 hover-lift hover:shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;