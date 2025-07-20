import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, Star, RotateCcw, TrendingUp, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../services/api';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { dispatch } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    favoriteItem: 'Chicken Rice',
    avgOrderValue: 0
  });

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await ordersAPI.getUserOrders(token);
        if (response.success) {
          setOrders(response.data);
          calculateStats(response.data);
        }
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (orderData: any[]) => {
    const totalOrders = orderData.length;
    const totalSpent = orderData.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
    
    // Find most ordered item
    const itemCounts: { [key: string]: number } = {};
    orderData.forEach(order => {
      order.items?.forEach((item: any) => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
      });
    });
    
    const favoriteItem = Object.keys(itemCounts).reduce((a, b) => 
      itemCounts[a] > itemCounts[b] ? a : b, 'Chicken Rice'
    );

    setStats({
      totalOrders,
      totalSpent,
      favoriteItem,
      avgOrderValue
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'preparing':
        return <Package className="h-5 w-5 text-orange-500" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Order Placed';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for Pickup';
      default:
        return 'Completed';
    }
  };

  const reorderItems = (items: any[]) => {
    items.forEach(item => {
      dispatch({ type: 'ADD_ITEM', payload: item });
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's your order summary and recent activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.totalSpent}</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">₹{Math.round(stats.avgOrderValue)}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Favorite Item</p>
              <p className="text-lg font-bold text-gray-900">{stats.favoriteItem}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-500">Start ordering to see your order history here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {orders.map((order: any) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm font-medium">{getStatusText(order.status)}</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {order.items?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-900">{item.name} x{item.quantity}</span>
                      <span className="text-gray-600">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-gray-900">Total: ₹{order.total}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => reorderItems(order.items)}
                    className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reorder</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-orange-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">📞 Contact Us</h4>
            <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
            <p className="text-sm font-medium text-orange-600">9840650939</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">📍 Pickup Location</h4>
            <p className="text-sm text-gray-600 mb-2">DHALOESH FAST FOOD</p>
            <a 
              href="https://maps.app.goo.gl/3CRUtZD1EHv8yQd36" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              View on Maps
            </a>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">⏰ Pickup Time</h4>
            <p className="text-sm text-gray-600 mb-2">Usually ready in</p>
            <p className="text-sm font-medium text-orange-600">15-20 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;