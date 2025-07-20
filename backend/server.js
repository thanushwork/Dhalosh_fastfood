const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dhaloesh_fastfood',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Check admin role
const requireAdmin = (req, res, next) => {
  if (req.user.email !== 'admin@dhaloesh.com') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, phone, password_hash) VALUES (?, ?, ?, ?)',
      [name, email, phone, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { id: result.insertId, email, name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        user: { id: result.insertId, name, email, phone },
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT id, name, email, phone FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: users[0] });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    await pool.execute(
      'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, req.user.id]
    );

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Menu Routes
app.get('/api/menu', async (req, res) => {
  try {
    const [menuItems] = await pool.execute(
      'SELECT * FROM menu_items WHERE is_available = 1 ORDER BY category, name'
    );

    res.json({ success: true, data: menuItems });
  } catch (error) {
    console.error('Menu fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.post('/api/menu', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO menu_items (name, price, category, description, image) VALUES (?, ?, ?, ?, ?)',
      [name, price, category, description, image]
    );

    res.json({
      success: true,
      data: { id: result.insertId, name, price, category, description, image }
    });
  } catch (error) {
    console.error('Menu create error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.put('/api/menu/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, description, image } = req.body;

    await pool.execute(
      'UPDATE menu_items SET name = ?, price = ?, category = ?, description = ?, image = ? WHERE id = ?',
      [name, price, category, description, image, id]
    );

    res.json({ success: true, message: 'Menu item updated successfully' });
  } catch (error) {
    console.error('Menu update error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.delete('/api/menu/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await pool.execute('UPDATE menu_items SET is_available = 0 WHERE id = ?', [id]);

    res.json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Menu delete error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Orders Routes
app.post('/api/orders', authenticateToken, async (req, res) => {
  try {
    const { items, total, customerInfo } = req.body;

    // Create order
    const [orderResult] = await pool.execute(
      'INSERT INTO orders (user_id, total, customer_name, customer_phone, customer_email, payment_status) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, total, customerInfo.name, customerInfo.phone, customerInfo.email, 'paid']
    );

    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      await pool.execute(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, price, item_name) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.menuItemId, item.quantity, item.price, item.itemName]
      );
    }

    res.json({
      success: true,
      data: { id: orderId, total, status: 'pending', paymentStatus: 'paid' }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/orders/user', authenticateToken, async (req, res) => {
  try {
    const [orders] = await pool.execute(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    // Get order items for each order
    for (let order of orders) {
      const [items] = await pool.execute(
        'SELECT * FROM order_items WHERE order_id = ?',
        [order.id]
      );
      order.items = items;
    }

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('User orders fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/orders', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [orders] = await pool.execute(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 50'
    );

    // Get order items for each order
    for (let order of orders) {
      const [items] = await pool.execute(
        'SELECT * FROM order_items WHERE order_id = ?',
        [order.id]
      );
      order.items = items;
    }

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/orders/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - 7);
    const thisMonthStart = new Date();
    thisMonthStart.setDate(1);
    const thisYearStart = new Date();
    thisYearStart.setMonth(0, 1);

    const [todayOrders] = await pool.execute(
      'SELECT COUNT(*) as count FROM orders WHERE DATE(created_at) = ?',
      [today]
    );

    const [weekOrders] = await pool.execute(
      'SELECT COUNT(*) as count FROM orders WHERE created_at >= ?',
      [thisWeekStart.toISOString()]
    );

    const [monthOrders] = await pool.execute(
      'SELECT COUNT(*) as count FROM orders WHERE created_at >= ?',
      [thisMonthStart.toISOString()]
    );

    const [yearOrders] = await pool.execute(
      'SELECT COUNT(*) as count FROM orders WHERE created_at >= ?',
      [thisYearStart.toISOString()]
    );

    const [allTimeOrders] = await pool.execute(
      'SELECT COUNT(*) as count FROM orders'
    );

    res.json({
      success: true,
      data: {
        today: todayOrders[0].count,
        thisWeek: weekOrders[0].count,
        thisMonth: monthOrders[0].count,
        thisYear: yearOrders[0].count,
        allTime: allTimeOrders[0].count
      }
    });
  } catch (error) {
    console.error('Order stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// WhatsApp notification endpoint
app.post('/api/whatsapp/order-notification', async (req, res) => {
  try {
    const { orderId, customerName, customerPhone, items, total, restaurantPhone } = req.body;

    const message = `🍽️ NEW ORDER #${orderId}

👤 Customer: ${customerName}
📞 Phone: ${customerPhone}

📋 Items:
${items.map(item => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}

💰 Total: ₹${total}
💳 Payment: Paid

⏰ Estimated time: 15-20 minutes
📞 Customer contact: ${customerPhone}`;

    // In production, integrate with WhatsApp Business API
    console.log(`WhatsApp message to ${restaurantPhone}:`, message);

    res.json({ success: true, message: 'Notification sent' });
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;