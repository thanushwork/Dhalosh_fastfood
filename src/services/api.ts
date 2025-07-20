// API service for database operations
// This file contains the API endpoints and functions for database integration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async (userData: { name: string; email: string; phone: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  logout: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getProfile: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  updateProfile: async (token: string, userData: { name: string; email: string; phone: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
};

// Orders API
export const ordersAPI = {
  createOrder: async (token: string, orderData: any) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },

  getUserOrders: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  updateOrderStatus: async (token: string, orderId: string, status: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  getAllOrders: async (token: string, filters?: any) => {
    const queryParams = filters ? `?${new URLSearchParams(filters)}` : '';
    const response = await fetch(`${API_BASE_URL}/orders${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getOrderStats: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Menu API
export const menuAPI = {
  getMenuItems: async () => {
    const response = await fetch(`${API_BASE_URL}/menu`);
    return response.json();
  },

  createMenuItem: async (token: string, itemData: any) => {
    const response = await fetch(`${API_BASE_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(itemData),
    });
    return response.json();
  },

  updateMenuItem: async (token: string, itemId: string, itemData: any) => {
    const response = await fetch(`${API_BASE_URL}/menu/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(itemData),
    });
    return response.json();
  },

  deleteMenuItem: async (token: string, itemId: string) => {
    const response = await fetch(`${API_BASE_URL}/menu/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getOrderTrends: async (token: string, period: string) => {
    const response = await fetch(`${API_BASE_URL}/analytics/trends?period=${period}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getCategoryStats: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/analytics/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  exportReport: async (token: string, reportType: string, dateRange: any) => {
    const response = await fetch(`${API_BASE_URL}/analytics/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ reportType, dateRange }),
    });
    return response.blob();
  },
};

// WhatsApp API
export const whatsappAPI = {
  sendOrderNotification: async (orderData: any) => {
    const response = await fetch(`${API_BASE_URL}/whatsapp/order-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },
};

// Error handler
export const handleAPIError = (error: any) => {
  console.error('API Error:', error);
  if (error.response) {
    // Server responded with error status
    return {
      success: false,
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      success: false,
      message: 'Network error - please check your connection',
    };
  } else {
    // Something else happened
    return {
      success: false,
      message: error.message || 'An unexpected error occurred',
    };
  }
};