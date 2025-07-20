import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, MapPin, Phone, ExternalLink, ChevronDown, Bell, Utensils, Star } from 'lucide-react';
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
          ? 'header-scrolled shadow-2xl' 
          : 'header-default shadow-xl'
      }`}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-circle floating-circle-1"></div>
          <div className="floating-circle floating-circle-2"></div>
          <div className="floating-circle floating-circle-3"></div>
          <div className="floating-circle floating-circle-4"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div 
              className="flex-shrink-0 cursor-pointer flex items-center space-x-3 group transition-all duration-500 hover:scale-110 relative z-10" 
              onClick={() => onPageChange('home')}
            >
              <div className="relative">
                <div className="logo-container group-hover:animate-wiggle">
                  <div className="logo-glow"></div>
                  <Utensils className="h-8 w-8 text-white relative z-10 group-hover:animate-spin-slow" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-bounce shadow-lg">
                  <Star className="h-3 w-3 text-white animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold logo-text group-hover:animate-pulse">
                  DHALOESH FAST FOOD
                </h1>
                <p className="text-xs text-white/80 hidden sm:block font-medium animate-fade-in">
                  🍽️ Quick Bites • 📦 Parcel Only
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1 relative z-10">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="nav-button group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10 nav-text">{item.label}</span>
                  <div className="nav-button-bg"></div>
                  <div className="nav-button-glow"></div>
                </button>
              ))}
            </nav>

            {/* Contact Info */}
            <div className="hidden xl:flex items-center space-x-6 text-sm relative z-10">
              <div className="contact-item group">
                <div className="contact-icon-phone">
                  <div className="contact-icon-glow-phone"></div>
                  <Phone className="h-4 w-4 text-white relative z-10 group-hover:animate-wiggle" />
                </div>
                <div>
                  <p className="font-semibold text-white group-hover:text-green-300 transition-colors">Call Now</p>
                  <p className="text-xs text-white/80">7299760102</p>
                </div>
              </div>
              <a 
                href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-item group"
              >
                <div className="contact-icon-location">
                  <div className="contact-icon-glow-location"></div>
                  <MapPin className="h-4 w-4 text-white relative z-10 group-hover:animate-bounce" />
                </div>
                <div>
                  <p className="font-semibold text-white group-hover:text-blue-300 transition-colors">Location</p>
                  <p className="text-xs flex items-center text-white/80">
                    View Map <ExternalLink className="h-3 w-3 ml-1" />
                  </p>
                </div>
              </a>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3 relative z-10">
              {/* Cart Button */}
              <button
                onClick={handleCartClick}
                className="action-button group cart-button"
              >
                <div className="action-button-bg cart-bg"></div>
                <div className="relative z-10">
                  <ShoppingCart className="h-6 w-6 text-white group-hover:animate-shake transition-transform duration-300" />
                  {state.items.length > 0 && (
                    <div className="cart-glow"></div>
                  )}
                </div>
                {state.items.length > 0 && (
                  <span className="cart-counter">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
                {state.items.length > 0 && (
                  <Bell className="cart-notification" />
                )}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  className="action-button group user-button"
                >
                  <div className="action-button-bg user-bg"></div>
                  <div className="relative">
                    <div className="relative z-10">
                      <User className="h-6 w-6 text-white group-hover:animate-pulse transition-transform duration-300" />
                      {isAuthenticated && (
                        <div className="user-glow"></div>
                      )}
                    </div>
                    {isAuthenticated && (
                      <div className="user-status"></div>
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-white relative z-10">
                    {isAuthenticated ? user?.name?.split(' ')[0] : 'Account'}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-white relative z-10 transition-transform duration-300 ${
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
                className="lg:hidden action-button group mobile-menu-button"
              >
                <div className="action-button-bg mobile-bg"></div>
                <div className="relative">
                {isMenuOpen ? 
                  <X className="h-6 w-6 rotate-90 transition-transform duration-300 text-white relative z-10" /> : 
                  <Menu className="h-6 w-6 transition-transform duration-300 text-white relative z-10 group-hover:animate-pulse" />
                }
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-white/20 mobile-menu animate-slideInDown">
              <nav className="py-4 space-y-1">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-white hover:text-orange-300 hover:bg-white/10 transition-all duration-300 rounded-lg mx-2"
                  >
                    {item.label}
                  </button>
                ))}
                
                <div className="border-t border-white/20 mt-4 pt-4 px-4 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-white">
                    <div className="p-1 bg-gradient-to-br from-green-400 to-green-600 rounded animate-bounce">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Call: 7299760102 / 9840650939</p>
                    </div>
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-sm text-white hover:text-blue-300 transition-colors"
                  >
                    <div className="p-1 bg-gradient-to-br from-blue-400 to-purple-600 rounded animate-ping">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
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