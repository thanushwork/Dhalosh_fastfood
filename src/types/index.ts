export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: Order[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface OrderStats {
  today: number;
  thisWeek: number;
  thisMonth: number;
  thisYear: number;
  allTime: number;
}