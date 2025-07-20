import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Order } from '../types';
import { authAPI } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateProfile: (userData: { name: string; email: string; phone: string }) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isAdmin: false,
  });

  useEffect(() => {
    // Check for stored user data and token
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      const user = JSON.parse(storedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
        isAdmin: user.email === 'admin@dhaloesh.com',
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        const user = response.data.user;
        const token = response.data.token;
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          isAdmin: user.email === 'admin@dhaloesh.com',
        });
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const signup = async (name: string, email: string, phone: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await authAPI.signup({ name, email, phone, password });
      
      if (response.success) {
        const user = response.data.user;
        const token = response.data.token;
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          isAdmin: false,
        });
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isAdmin: false,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  const addOrder = (order: Order) => {
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        orders: [...(authState.user.orders || []), order],
      };
      setAuthState(prev => ({ ...prev, user: updatedUser }));
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updateProfile = async (userData: { name: string; email: string; phone: string }): Promise<{ success: boolean; message?: string }> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return { success: false, message: 'Not authenticated' };

      const response = await authAPI.updateProfile(token, userData);
      
      if (response.success) {
        const updatedUser = { ...authState.user, ...userData };
        setAuthState(prev => ({ ...prev, user: updatedUser }));
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Update failed' };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        addOrder,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};