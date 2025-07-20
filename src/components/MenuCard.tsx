import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { state, dispatch } = useCart();
  
  const cartItem = state.items.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateQuantity = (newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 group hover-lift animate-scaleIn">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-bounce-custom">
          ₹{item.price}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">{item.category}</span>
          </div>
          
          {quantity === 0 ? (
            <button
              onClick={addToCart}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
              <button
                onClick={() => updateQuantity(quantity - 1)}
                className="text-orange-600 hover:text-orange-700 transition-all duration-200 p-1 hover:bg-orange-100 rounded transform hover:scale-110"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-bold text-orange-600 min-w-[20px] text-center animate-pulse">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(quantity + 1)}
                className="text-orange-600 hover:text-orange-700 transition-all duration-200 p-1 hover:bg-orange-100 rounded transform hover:scale-110"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;