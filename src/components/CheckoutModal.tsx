import React, { useState } from 'react';
import { X, CreditCard, Phone, CheckCircle, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';
import { ordersAPI, whatsappAPI } from '../services/api';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { state, dispatch } = useCart();
  const { user, addOrder } = useAuth();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [loading, setLoading] = useState(false);

  // Generate UPI payment link
  const generateUPILink = (amount: number) => {
    return `upi://pay?pa=thanushkannan@sbi&pn=Thanush&am=${amount}.00&cu=INR&tn=DHALOESH%20Order%20Payment`;
  };

  // Generate QR code URL (using a QR code API)
  const generateQRCode = (amount: number) => {
    const upiLink = generateUPILink(amount);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate validation
    setTimeout(() => {
      setLoading(false);
      setStep('payment');
    }, 1000);
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('Please login to place order');
        return;
      }

      // Create order in database
      const orderData = {
        items: state.items.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price,
          itemName: item.name
        })),
        total: state.total,
        customerInfo
      };

      const response = await ordersAPI.createOrder(token, orderData);
      
      if (response.success) {
        const order: Order = {
          id: response.data.id,
          userId: user?.id || '',
          items: state.items,
          total: state.total,
          status: 'pending',
          paymentStatus: 'paid',
          createdAt: new Date(),
          customerInfo,
        };

        // Send WhatsApp notification
        const whatsappData = {
          orderId: order.id,
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          items: state.items,
          total: state.total,
          restaurantPhone: '9840650939'
        };

        await whatsappAPI.sendOrderNotification(whatsappData);

        addOrder(order);
        dispatch({ type: 'CLEAR_CART' });
        setStep('success');
        
        setTimeout(() => {
          onSuccess();
          onClose();
          setStep('details');
        }, 4000);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 'details' && 'Order Details'}
            {step === 'payment' && 'Payment'}
            {step === 'success' && 'Order Confirmed'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t pt-1 mt-2 font-semibold">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>₹{state.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  📦 <strong>Parcel Only</strong> - No delivery service<br/>
                  ⏰ Ready in 15-20 minutes<br/>
                  🚫 Skip the queue after payment
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:bg-gray-300"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          )}

          {step === 'payment' && (
            <div className="text-center">
              <div className="mb-6">
                <QrCode className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pay ₹{state.total}</h3>
                <p className="text-sm text-gray-600">Scan QR code or use UPI link</p>
              </div>
              
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                <div className="space-y-1 text-sm">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t pt-1 mt-2 font-semibold">
                    <div className="flex justify-between text-lg">
                      <span>Total Amount</span>
                      <span className="text-orange-600">₹{state.total}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <div className="bg-white p-6 rounded-lg border-2 border-orange-200 mb-6">
                <img
                  src={generateQRCode(state.total)}
                  alt="UPI QR Code"
                  className="w-48 h-48 mx-auto mb-4"
                />
                <p className="text-sm text-gray-600 mb-2">Scan with any UPI app</p>
                <p className="text-xs text-gray-500">GPay • PhonePe • Paytm • BHIM</p>
              </div>

              {/* UPI Link */}
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-900 mb-2">UPI Payment</h4>
                <p className="text-sm text-green-800 mb-2">Pay to: thanushkannan@sbi</p>
                <a
                  href={generateUPILink(state.total)}
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Pay ₹{state.total} via UPI
                </a>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg mb-6">
                <p className="text-sm text-yellow-800">
                  💡 After payment, click "I have paid" to confirm your order
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-300"
              >
                {loading ? 'Confirming Payment...' : 'I have paid ₹' + state.total}
              </button>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Confirmed!</h3>
              <p className="text-sm text-gray-600 mb-4">
                Your order has been sent to the restaurant.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-green-800">
                  <strong>Order ID:</strong> #{Date.now()}<br/>
                  <strong>Contact:</strong> 9840650939<br/>
                  <strong>Pickup Time:</strong> 15-20 minutes
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong><br/>
                  • We'll call you for confirmation<br/>
                  • Your order will be prepared<br/>
                  • Come to restaurant and skip the queue<br/>
                  • Show this order confirmation
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;