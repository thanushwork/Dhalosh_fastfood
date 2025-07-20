import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          onClose();
          setFormData({ name: '', email: '', phone: '', password: '' });
        } else {
          setError(result.message || 'Login failed');
        }
      } else {
        const result = await signup(formData.name, formData.email, formData.phone, formData.password);
        if (result.success) {
          onClose();
          setFormData({ name: '', email: '', phone: '', password: '' });
        } else {
          setError(result.message || 'Registration failed');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', password: '' });
    setError('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isLogin ? 'Login to Your Account' : 'Create New Account'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your password"
                />
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button
                type="button"
                onClick={switchMode}
                className="text-orange-600 hover:text-orange-700 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
              <p className="text-xs text-gray-500">
                <strong>Admin:</strong> admin@dhaloesh.com / admin123<br/>
                <strong>Customer:</strong> Create new account or use any email
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export { AuthModal };