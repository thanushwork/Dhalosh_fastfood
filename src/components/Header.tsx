import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, MapPin, Phone, ExternalLink, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onAuthClick: () => void;
  onCartClick: () => void;
  currentPage: 'home' | 'dashboard' | 'admin' | 'menu-management' | 'orders' | 'profile';
  onPageChange: (page: 'home' | 'dashboard' | 'admin' | 'menu-management' | 'orders' | 'profile') => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick, onCartClick, currentPage, onPageChange }) => {
  const { state, dispatch } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleCartClick = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Our Menu', action: () => scrollToSection('menu') },
    { label: 'About', action: () => scrollToSection('about') },
    { label: 'Food Gallery', action: () => scrollToSection('gallery') },
    { label: 'Reviews', action: () => scrollToSection('reviews') },
    { label: 'Contact', action: () => scrollToSection('contact') }
  ];

  const userMenuItems = isAuthenticated ? [
    { label: 'Dashboard', action: () => onPageChange('dashboard') },
    { label: 'My Profile', action: () => onPageChange('profile') },
    ...(user?.email === 'admin@dhaloesh.com' ? [
      { label: 'Analytics', action: () => onPageChange('admin') },
      { label: 'Menu Management', action: () => onPageChange('menu-management') }
    ] : []),
    { label: 'Logout', action: logout }
  ] : [
    { label: 'Login', action: onAuthClick }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-orange-100' 
          : 'bg-white/90 backdrop-blur-sm shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center space-x-3 group transition-all duration-300 hover:scale-105" 
              onClick={() => onPageChange('home')}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  DHALOESH FAST FOOD
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block font-medium">
                  🍽️ Quick Bites • 📦 Parcel Only
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-all duration-300 rounded-lg hover:bg-orange-50 group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="hidden xl:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors group">
                <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Call Now</p>
                  <p className="text-xs">7299760102</p>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors group"
              >
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-xs flex items-center">
                    View Map <ExternalLink className="h-3 w-3 ml-1" />
                  </p>
                </div>
              </a>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {/* Cart Button */}
              <button
                onClick={handleCartClick}
                className="relative p-3 text-gray-600 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50 group"
              >
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-bounce font-bold shadow-lg">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  className="flex items-center space-x-2 p-3 text-gray-600 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50 group"
                >
                  <div className="relative">
                    <User className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    {isAuthenticated && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {isAuthenticated ? user?.name?.split(' ')[0] : 'Account'}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                    activeDropdown === 'user' ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* User Dropdown */}
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeInUp">
                    {isAuthenticated && (
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    )}
                    {userMenuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item.action();
                          setActiveDropdown(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-3 text-gray-600 hover:text-orange-600 transition-all duration-300 rounded-xl hover:bg-orange-50"
              >
                {isMenuOpen ? 
                  <X className="h-6 w-6 rotate-90 transition-transform duration-300" /> : 
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                }
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-lg animate-slideInDown">
              <nav className="py-4 space-y-1">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 rounded-lg mx-2"
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="border-t border-gray-200 mt-4 pt-4 px-4 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <div>
                      <p className="font-semibold">Call: 7299760102 / 9840650939</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span>View Location on Map</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20"></div>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        ></div>
      )}
    </>
  );
};

export default Header;