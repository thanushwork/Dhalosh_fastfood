import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';
import { menuAPI } from '../services/api';
import { MenuItem } from '../types';

const AdminMenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const categories = ['Rice', 'Dry', 'Gravy', 'Starters'];

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = async () => {
    try {
      const response = await menuAPI.getMenuItems();
      if (response.success) {
        setMenuItems(response.data);
      }
    } catch (error) {
      console.error('Error loading menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const itemData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      const response = await menuAPI.createMenuItem(token, itemData);
      if (response.success) {
        setMenuItems([...menuItems, response.data]);
        setShowAddForm(false);
        setFormData({ name: '', price: '', category: '', description: '', image: '' });
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const handleUpdateItem = async (itemId: string, updatedData: any) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await menuAPI.updateMenuItem(token, itemId, updatedData);
      if (response.success) {
        setMenuItems(menuItems.map(item => 
          item.id === itemId ? { ...item, ...updatedData } : item
        ));
        setEditingItem(null);
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const response = await menuAPI.deleteMenuItem(token, itemId);
      if (response.success) {
        setMenuItems(menuItems.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const EditableRow: React.FC<{ item: MenuItem }> = ({ item }) => {
    const [editData, setEditData] = useState({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      description: item.description || '',
      image: item.image || ''
    });

    const handleSave = () => {
      handleUpdateItem(item.id, {
        ...editData,
        price: parseFloat(editData.price)
      });
    };

    return (
      <tr className="bg-yellow-50">
        <td className="px-6 py-4">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          />
        </td>
        <td className="px-6 py-4">
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          />
        </td>
        <td className="px-6 py-4">
          <select
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            className="w-full px-2 py-1 border rounded"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </td>
        <td className="px-6 py-4">
          <input
            type="text"
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-2 py-1 border rounded"
            placeholder="Description"
          />
        </td>
        <td className="px-6 py-4">
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-700"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={() => setEditingItem(null)}
              className="text-gray-600 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading menu items...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Add New Item Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Menu Item</h2>
          <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Item description..."
              />
            </div>
            
            <div className="md:col-span-2 flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Item
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Menu Items Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price (₹)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuItems.map((item) => (
                editingItem === item.id ? (
                  <EditableRow key={item.id} item={item} />
                ) : (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                        )}
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(item.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuManagement;