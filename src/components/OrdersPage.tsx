import React from 'react';
import { Clock, CheckCircle, Package, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const OrdersPage: React.FC = () => {
  const { user } = useAuth();
  const { dispatch } = useCart();

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

  if (!user?.orders || user.orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">No Orders Yet</h2>
          <p className="text-gray-500">Start ordering to see your order history here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {user.orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className="text-sm font-medium">{getStatusText(order.status)}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <span className="text-gray-900">{item.name} x{item.quantity}</span>
                  <span className="text-gray-600">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 flex items-center justify-between">
              <div>
                <span className="text-lg font-semibold text-gray-900">Total: ₹{order.total}</span>
                <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
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
    </div>
  );
};

export default OrdersPage;