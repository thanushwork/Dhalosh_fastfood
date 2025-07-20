import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import CustomerDashboard from './components/CustomerDashboard';
import AdminPage from './components/AdminPage';
import AdminMenuManagement from './components/AdminMenuManagement';
import OrdersPage from './components/OrdersPage';
import UserProfile from './components/UserProfile';
import Cart from './components/Cart';
import { AuthModal } from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import Toast from './components/Toast';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard' | 'admin' | 'menu-management' | 'orders' | 'profile'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const handleCartClick = () => {
    // Cart visibility is handled by CartContext
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleCheckoutSuccess = () => {
    setToast({
      message: 'Order placed successfully! You will receive a confirmation call shortly.',
      type: 'success',
    });
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <CustomerDashboard />;
      case 'admin':
        return <AdminPage />;
      case 'menu-management':
        return <AdminMenuManagement />;
      case 'orders':
        return <OrdersPage />;
      case 'profile':
        return <UserProfile />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header
            onAuthClick={() => setShowAuthModal(true)}
            onCartClick={handleCartClick}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
          
          <main>
            {renderPage()}
          </main>
          
          <Footer />

          <Cart onCheckout={handleCheckout} />
          
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
          
          <CheckoutModal
            isOpen={showCheckoutModal}
            onClose={() => setShowCheckoutModal(false)}
            onSuccess={handleCheckoutSuccess}
          />

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;