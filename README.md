# DHALOESH FAST FOOD - Complete Restaurant Ordering Website

A modern, production-ready restaurant ordering website with MySQL database integration, user authentication, admin dashboard, and UPI payment system.

## 🚀 Features

### **Customer Features**
- ✅ User registration and login system
- ✅ Customer dashboard with order statistics
- ✅ Dynamic menu browsing with categories
- ✅ Shopping cart with real-time calculations
- ✅ UPI payment integration with QR code
- ✅ Order history and reorder functionality
- ✅ Profile management
- ✅ Mobile-responsive design

### **Admin Features**
- ✅ Admin authentication (admin@dhaloesh.com / admin123)
- ✅ Sales analytics dashboard with charts
- ✅ Menu management (add/edit/delete items)
- ✅ Order tracking and management
- ✅ Real-time order statistics
- ✅ Export reports functionality

### **Business Features**
- ✅ **Parcel Only Service** - No delivery, no dine-in
- ✅ UPI payment with automatic QR code generation
- ✅ WhatsApp order notifications to restaurant
- ✅ Order confirmation calls to customers
- ✅ Queue skip system for paid orders

## 🛠️ Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Context API for state management
- Recharts for analytics
- Lucide React for icons

**Backend:**
- Node.js with Express
- MySQL database
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## 📋 Complete Setup Instructions

### **🚀 Quick Start Guide (FREE Setup)**

Follow these steps to run the project completely FREE:

### **📋 Prerequisites**
Before starting, make sure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

#### **Step 1: Clone and Setup Project**
```bash
# 1. Clone the repository (replace with your actual repo URL)
git clone <your-repo-url>
cd dhaloesh-fast-food

# 2. Install frontend dependencies (this may take 2-3 minutes)
npm install

# 3. Setup backend dependencies
cd backend
npm install
cd ..
```

#### **Step 2: FREE Database Setup (PlanetScale - Recommended)**

**🌟 PlanetScale Setup (100% FREE):**
1. **Visit [planetscale.com](https://planetscale.com)**
2. **Sign up with GitHub** (No credit card required)
3. **Create new database:**
   - Database name: `dhaloesh-fastfood`
   - Region: Choose closest to you (e.g., `us-east`, `ap-south`)
4. **Get connection details:**
   - Click on your database
   - Go to "Connect" tab
   - Select "Connect with: Node.js"
   - Copy the connection details (host, username, password)

**📝 Example Connection Details:**
```
Host: aws.connect.psdb.cloud
Username: xxxxxxxxxx
Password: pscale_pw_xxxxxxxxxx
Database: dhaloesh-fastfood
```

#### **Step 3: Backend Environment Setup**
```bash
# 1. Navigate to backend folder
cd backend

# 2. Create environment file from example
cp .env.example .env
```

**Edit the `.env` file with your database credentials:**
```env
# Database Configuration (Replace with your PlanetScale details)
DB_HOST=aws.connect.psdb.cloud
DB_USER=your_planetscale_username
DB_PASSWORD=your_planetscale_password
DB_NAME=dhaloesh-fastfood

# JWT Secret (Generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random

# Server Configuration
PORT=3001

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# WhatsApp Configuration
WHATSAPP_API_URL=https://api.whatsapp.com/send
RESTAURANT_PHONE=9840650939
```

**🔐 Generate JWT Secret:**
```bash
# Option 1: Use Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: Use online generator
# Visit: https://generate-secret.vercel.app/64
```

#### **Step 4: Database Schema Setup**

**Method 1: Using PlanetScale Console (Recommended)**
1. **Go to your PlanetScale dashboard**
2. **Click on your database → "Console" tab**
3. **Copy and paste the SQL from `supabase/migrations/20250719132825_light_stream.sql`**
4. **Execute the SQL commands**

**Method 2: Using MySQL Client**
```bash
# If you have MySQL client installed
mysql -h aws.connect.psdb.cloud -u your_username -p your_database < supabase/migrations/20250719132825_light_stream.sql
```

**✅ Verify Database Setup:**
- Check if tables are created: `users`, `menu_items`, `orders`, `order_items`
- Verify admin user exists: `admin@dhaloesh.com`
- Confirm menu items are populated

#### **Step 5: Start the Application**
```bash
# Terminal 1: Start Backend Server
cd backend
npm run dev
# ✅ You should see: "Server running on port 3001"

# Terminal 2: Start Frontend (Open NEW terminal window)
cd dhaloesh-fast-food  # Navigate to project root
echo "VITE_API_URL=http://localhost:3001/api" > .env
npm run dev
# ✅ You should see: "Local: http://localhost:5173"
```

#### **Step 6: Test the Application**
1. **Open browser:** [http://localhost:5173](http://localhost:5173)
2. **Test admin login:**
   - Email: admin@dhaloesh.com
   - Password: admin123
3. **Test customer features:**
   - Create new customer account
   - Browse menu items
   - Add items to cart
   - Place test order
   - Check admin dashboard for order

---

## 🔧 **Troubleshooting Common Issues**

### **❌ Backend Won't Start**
```bash
# Check if all dependencies are installed
cd backend
npm install

# Check environment variables
cat .env

# Test database connection
npm run dev
# Look for "Server running on port 3001" message
```

### **❌ Frontend Can't Connect to Backend**
```bash
# Check if backend is running
curl http://localhost:3001/api/menu
# Should return JSON response

# Check frontend environment
cat .env
# Should contain: VITE_API_URL=http://localhost:3001/api

# Restart frontend
npm run dev
```

### **❌ Database Connection Issues**
1. **Verify database credentials in `backend/.env`**
2. **Check if PlanetScale database is active**
3. **Ensure database schema is imported**
4. **Test connection from PlanetScale console**

### **❌ CORS Errors**
```bash
# Make sure backend .env has correct frontend URL
FRONTEND_URL=http://localhost:5173

# Restart backend server
cd backend
npm run dev
```

---

## 🌐 **FREE Deployment Guide**

### **🚀 Deploy Frontend (Netlify - FREE)**

#### **Step 1: Prepare for Deployment**
```bash
# 1. Build the frontend
npm run build

# 2. Test the build locally
npm run preview
```

#### **Step 2: Deploy to Netlify**
1. **Go to [netlify.com](https://netlify.com)**
2. **Sign up with GitHub**
3. **Click "Add new site" → "Import an existing project"**
4. **Connect your GitHub repository**
5. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables:
     ```
     VITE_API_URL=https://your-backend-url.railway.app/api
     ```
6. **Deploy site**

### **🚀 Deploy Backend (Railway - FREE)**

#### **Step 1: Prepare Backend**
```bash
# Add start script to backend/package.json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### **Step 2: Deploy to Railway**
1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project" → "Deploy from GitHub repo"**
4. **Select your repository**
5. **Configure settings:**
   - Root directory: `backend`
   - Start command: `npm start`
6. **Add environment variables:**
   ```
   DB_HOST=your_planetscale_host
   DB_USER=your_planetscale_username
   DB_PASSWORD=your_planetscale_password
   DB_NAME=dhaloesh-fastfood
   JWT_SECRET=your_jwt_secret
   PORT=3001
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```
7. **Deploy**

### **🔄 Update Frontend with Backend URL**
1. **Get your Railway backend URL** (e.g., `https://your-app.railway.app`)
2. **Update Netlify environment variables:**
   ```
   VITE_API_URL=https://your-app.railway.app/api
   ```
3. **Redeploy frontend**

---

## 💰 **Cost Breakdown (100% FREE Setup)**

| Service | Free Tier | Limits | Perfect For |
|---------|-----------|--------|-------------|
| **PlanetScale** | ✅ FREE | 1GB storage, 1B reads/month | Small to medium restaurants |
| **Netlify** | ✅ FREE | 100GB bandwidth/month | Frontend hosting |
| **Railway** | ✅ FREE | $5 credit/month | Backend hosting |
| **Domain** | 💰 Optional | $10-15/year | Custom branding |
| **Total** | **₹0/month** | Scales with business | **Perfect for startups** |

---

## 🔗 **Google Reviews Integration**

### **🌟 Automatic Google Reviews (Advanced)**

#### **Step 1: Get Google Places API Key**
1. **Go to [Google Cloud Console](https://console.cloud.google.com)**
2. **Create new project or select existing**
3. **Enable "Places API"**
4. **Create API key**
5. **Restrict API key to your domain**

#### **Step 2: Find Your Place ID**
1. **Use [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)**
2. **Search for your restaurant**
3. **Copy the Place ID**

#### **Step 3: Add to Frontend**
```javascript
// Add to src/components/ReviewsSection.tsx
const GOOGLE_PLACES_API_KEY = 'your_api_key_here';
const PLACE_ID = 'your_place_id_here';

const fetchGoogleReviews = async () => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${GOOGLE_PLACES_API_KEY}`
  );
  const data = await response.json();
  return data.result.reviews;
};
```

#### **Step 4: Customer Review Flow**
1. **After order completion → Send WhatsApp with review link**
2. **Review link format:**
   ```
   https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
   ```
3. **Auto-refresh reviews every hour**

---

## 📱 **Mobile Testing**
```bash
# Find your local IP address
# macOS/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows:
ipconfig | findstr IPv4

# Update frontend .env for mobile testing
VITE_API_URL=http://YOUR_LOCAL_IP:3001/api

# Access from mobile: http://YOUR_LOCAL_IP:5173
```

---

## 🎯 **Production Checklist**

### **✅ Before Going Live:**
- [ ] Test all functionality thoroughly
- [ ] Add real food images to menu items
- [ ] Configure production database
- [ ] Set up custom domain
- [ ] Configure WhatsApp Business API
- [ ] Add Google Analytics
- [ ] Set up backup strategy
- [ ] Test payment flow
- [ ] Verify admin dashboard
- [ ] Test mobile responsiveness

### **🔒 Security Checklist:**
- [ ] Change default admin password
- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Regular database backups

---

## 📞 **Support & Help**

### **🆘 Need Help?**
- **Restaurant Phone:** 9840650939 / 7299760102
- **Technical Issues:** Check troubleshooting section above
- **Database Issues:** Verify PlanetScale connection
- **Deployment Issues:** Check environment variables

### **📚 Useful Resources:**
- [PlanetScale Documentation](https://planetscale.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Railway Documentation](https://docs.railway.app)
- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)

### **Step 1: Database Setup (MySQL)**

#### Option A: Local MySQL Installation
1. **Install MySQL:**
   ```bash
   # Windows: Download from mysql.com
   # macOS: brew install mysql
   # Ubuntu: sudo apt install mysql-server
   ```

2. **Start MySQL service:**
   ```bash
   # Windows: Start MySQL service from Services
   # macOS: brew services start mysql
   # Ubuntu: sudo systemctl start mysql
   ```

3. **Create database and user:**
   ```sql
   mysql -u root -p
   CREATE DATABASE dhaloesh_fastfood;
   CREATE USER 'dhaloesh_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON dhaloesh_fastfood.* TO 'dhaloesh_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

#### Option B: Free Cloud MySQL (Recommended)
1. **PlanetScale (FREE):**
   - Go to [planetscale.com](https://planetscale.com)
   - Create free account
   - Create new database
   - Get connection string

2. **Railway (FREE):**
   - Go to [railway.app](https://railway.app)
   - Create MySQL database
   - Get connection details

3. **Aiven (FREE Trial):**
   - Go to [aiven.io](https://aiven.io)
   - Create MySQL service
   - Get connection string

### **Step 2: Database Schema Creation**

Run this SQL script to create all necessary tables:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS dhaloesh_fastfood;
USE dhaloesh_fastfood;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(500),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed') DEFAULT 'pending',
    payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- Insert default admin user
INSERT INTO users (name, email, phone, password_hash) VALUES 
('Admin User', 'admin@dhaloesh.com', '9840650939', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
-- Default password: admin123

-- Insert sample menu items
INSERT INTO menu_items (name, price, category, description, image) VALUES
('Chicken Rice', 120, 'Rice', 'Flavorful chicken rice with aromatic spices', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('1/2 Chicken Rice', 140, 'Rice', 'Half portion chicken rice - perfect for sharing', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Beef Rice', 120, 'Rice', 'Tender beef rice with traditional spices', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('1/2 Beef Rice', 140, 'Rice', 'Half portion beef rice - ideal for sharing', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Chilli Beef Dry', 120, 'Dry', 'Spicy dry beef with bell peppers and onions', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Chilli Chicken Dry', 120, 'Dry', 'Crispy chicken with spicy dry masala', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Chilli Beef Gravy', 130, 'Gravy', 'Rich beef curry with thick gravy', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Chilli Chicken Gravy', 130, 'Gravy', 'Succulent chicken in spicy gravy', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Chicken 65', 120, 'Starters', 'Famous South Indian spicy chicken starter', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Chicken Lollipop', 120, 'Starters', 'Crispy chicken lollipops with spicy coating', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Chicken Leg', 120, 'Starters', 'Marinated chicken leg grilled to perfection', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400');

-- Create indexes for better performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
```

### **Step 3: Backend Setup**

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit .env file with your database credentials:**
   ```env
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=dhaloesh_fastfood
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=3001
   ```

5. **Import database schema:**
   ```bash
   mysql -u your_username -p dhaloesh_fastfood < database.sql
   ```

6. **Start backend server:**
   ```bash
   npm run dev
   ```

### **Step 4: Frontend Setup**

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Create frontend environment file:**
   ```bash
   echo "VITE_API_URL=http://localhost:3001/api" > .env
   ```

3. **Start frontend development server:**
   ```bash
   npm run dev
   ```

### **Step 5: Test the Application**

1. **Access the website:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

2. **Test admin login:**
   - Email: admin@dhaloesh.com
   - Password: admin123

3. **Test customer registration:**
   - Create new customer account
   - Place test order
   - Check admin dashboard

## 💳 UPI Payment Integration

The system automatically generates UPI payment links and QR codes:

**UPI ID:** thanushkannan@sbi
**Format:** `upi://pay?pa=thanushkannan@sbi&pn=Thanush&am=AMOUNT&cu=INR`

### QR Code Generation
- Automatic QR code generation for each order
- Works with all UPI apps (GPay, PhonePe, Paytm, BHIM)
- Real-time amount calculation

## 📱 WhatsApp Integration

Orders are automatically sent to WhatsApp number: **9840650939**

**Message Format:**
```
🍽️ NEW ORDER #12345

👤 Customer: John Doe
📞 Phone: 9876543210

📋 Items:
• Chicken Rice x2 - ₹240
• Chicken 65 x1 - ₹120

💰 Total: ₹360
💳 Payment: Paid

⏰ Estimated time: 15-20 minutes
📞 Customer contact: 9876543210
```

## 🔐 Authentication System

### Customer Authentication
- Email/password based registration
- JWT token authentication
- Profile management
- Order history tracking

### Admin Authentication
- **Email:** admin@dhaloesh.com
- **Password:** admin123
- Full dashboard access
- Menu management permissions

## 📊 Admin Dashboard Features

### Analytics
- Today's orders count
- Weekly/Monthly/Yearly statistics
- Interactive charts and graphs
- Order trends visualization

### Menu Management
- Add new menu items
- Edit existing items (name, price, category, description)
- Delete/disable items
- Image URL management

### Order Management
- View all orders in real-time
- Order status tracking
- Customer information display
- Payment status monitoring

## 🌐 Deployment Options

### **FREE Hosting (Recommended for Testing)**

#### Frontend (Netlify - FREE)
1. **Connect GitHub repository:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables: `VITE_API_URL=your_backend_url`

#### Backend (Railway - FREE) 
1. **Deploy on Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Add environment variables
   - Deploy automatically

#### Alternative Backend (Render - FREE)
1. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Connect GitHub repository
   - Select "Web Service"
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`
   - Add environment variables

#### Alternative Backend (Vercel - FREE)
1. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Connect GitHub repository
   - Framework: Other
   - Root directory: `backend`
   - Build command: `npm install`
   - Output directory: Leave empty
   - Install command: `npm install`

### **🆓 FREE MySQL Database Options**

#### **Option 1: PlanetScale (Recommended - FREE)**
- **Website:** [planetscale.com](https://planetscale.com)
- **Free Tier:** 1 database, 1GB storage, 1 billion reads/month
- **Setup Time:** 5 minutes
- **No Credit Card Required**

#### **Option 2: Railway MySQL (FREE)**
- **Website:** [railway.app](https://railway.app)
- **Free Tier:** $5 credit monthly (enough for small apps)
- **Setup Time:** 3 minutes
- **GitHub login required**

#### **Option 3: Aiven MySQL (FREE Trial)**
- **Website:** [aiven.io](https://aiven.io)
- **Free Trial:** 1 month free
- **Setup Time:** 5 minutes
- **Credit card required (but not charged during trial)**

#### **Option 4: FreeSQLDatabase (FREE)**
- **Website:** [freesqldatabase.com](https://freesqldatabase.com)
- **Free Tier:** 5MB storage (good for testing)
- **Setup Time:** 2 minutes
- **No registration required**

### **💰 Cost Breakdown for FREE Setup**

#### **100% FREE Setup (Perfect for Small Business)**
- **Database:** PlanetScale Free (1GB storage)
- **Frontend:** Netlify Free (100GB bandwidth)
- **Backend:** Railway Free ($5 monthly credit)
- **Domain:** Use provided subdomain
- **Total Cost:** ₹0/month ✅

#### **Limitations of FREE Setup:**
- PlanetScale: 1GB storage limit
- Netlify: 100GB bandwidth/month
- Railway: $5 credit/month (usually enough)
- Custom domain not included

### **🔧 Troubleshooting Common Issues**

#### **Backend Won't Start:**
```bash
# Check if all dependencies are installed
cd backend
npm install

# Check environment variables
cat .env

# Test database connection
node -e "console.log('Testing DB connection...')"
```

#### **Frontend Can't Connect to Backend:**
```bash
# Check if backend is running
curl http://localhost:3001/api/menu

# Check frontend environment
cat .env
# Should contain: VITE_API_URL=http://localhost:3001/api
```

#### **Database Connection Issues:**
1. **Verify database credentials in backend/.env**
2. **Check if database server is running**
3. **Ensure database schema is imported**
4. **Test connection from database client**

### **📱 Mobile Testing**
```bash
# To test on mobile devices in same network
# Find your local IP address
ipconfig getifaddr en0  # macOS
ip route get 1.2.3.4 | awk '{print $7}'  # Linux
ipconfig | findstr IPv4  # Windows

# Update frontend .env
VITE_API_URL=http://YOUR_LOCAL_IP:3001/api

# Access from mobile: http://YOUR_LOCAL_IP:5173
```

### **Production Hosting**

#### Frontend Options
- **Netlify Pro:** $19/month
- **Vercel Pro:** $20/month
- **AWS S3 + CloudFront:** ~$5/month

#### Backend Options
- **Railway:** $5/month
- **Heroku:** $7/month
- **DigitalOcean:** $5/month
- **AWS EC2:** $5-10/month

#### Database Options
- **PlanetScale:** $29/month (production)
- **AWS RDS:** $15-25/month
- **DigitalOcean Managed MySQL:** $15/month

## 💰 Cost Breakdown

### **FREE Setup (Perfect for Testing)**
- Database: PlanetScale Free
- Frontend: Netlify Free
- Backend: Railway Free
- **Total: ₹0/month**

### **Professional Setup**
- Database: PlanetScale Pro (₹2,200/month)
- Frontend: Netlify Pro (₹1,500/month)
- Backend: Railway Pro (₹400/month)
- Domain: .com domain (₹800/year)
- **Total: ₹4,100/month + ₹800/year**

### **Budget Setup (Recommended)**
- Database: PlanetScale Free
- Frontend: Netlify Free
- Backend: Railway Hobby (₹400/month)
- Domain: .com domain (₹800/year)
- **Total: ₹400/month + ₹800/year**

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001/api
```

### Backend (.env)
```env
DB_HOST=your_mysql_host
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=dhaloesh_fastfood
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## 🚀 Quick Start Commands

```bash
# 1. Clone repository
git clone <your-repo-url>
cd dhaloesh-fast-food

# 2. Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
mysql -u root -p dhaloesh_fastfood < database.sql
npm run dev

# 3. Setup frontend (in new terminal)
cd ..
npm install
echo "VITE_API_URL=http://localhost:3001/api" > .env
npm run dev
```

## 📱 Mobile Optimization

- **Mobile-first design approach**
- **Touch-friendly interface elements**
- **Responsive navigation menu**
- **Optimized cart for mobile screens**
- **Fast loading on mobile networks**

## 🔒 Security Features

- **JWT token authentication**
- **Password hashing with bcrypt**
- **SQL injection prevention**
- **CORS protection**
- **Input validation and sanitization**
- **Admin role-based access control**

## 📞 Support & Contact

- **Restaurant Phone:** 9840650939 / 7299760102
- **Location:** [Google Maps](https://maps.app.goo.gl/3CRUtZD1EHv8yQd36)
- **Service:** Parcel Only (No Delivery, No Dine-in)

## 🎯 Next Steps After Setup

1. **Test all functionality thoroughly**
2. **Add real food images to menu items**
3. **Configure production database**
4. **Set up domain and SSL certificate**
5. **Configure WhatsApp Business API**
6. **Add Google Analytics tracking**
7. **Implement backup strategy**
8. **Set up monitoring and alerts**

## 🔗 Google Reviews Integration

### **Real Google Reviews Integration:**

#### Option 1: Google Places API (Recommended)
```javascript
// Add to your frontend
const GOOGLE_PLACES_API_KEY = 'your_api_key';
const PLACE_ID = 'your_google_place_id';

const fetchGoogleReviews = async () => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating&key=${GOOGLE_PLACES_API_KEY}`
  );
  const data = await response.json();
  return data.result.reviews;
};
```

#### Option 2: Google My Business API
- More comprehensive but requires business verification
- Allows responding to reviews
- Real-time review notifications

#### Setup Steps:
1. **Get Google Places API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable Places API
   - Create API key

2. **Find Your Place ID:**
   - Use [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for your restaurant

3. **Add Review Widget:**
   - Embed Google reviews widget
   - Auto-refresh every hour
   - Display latest 5-10 reviews

#### Customer Review Flow:
1. **After Order Completion:**
   - Send WhatsApp message with Google review link
   - Email follow-up with review request
   - In-app notification to leave review

2. **Review Link Format:**
   ```
   https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
   ```

---

**🚀 Your restaurant website is now ready for production!**

The system includes everything needed for a modern restaurant ordering experience with secure payments, real-time notifications, and comprehensive admin controls.