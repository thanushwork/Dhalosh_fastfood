-- DHALOESH FAST FOOD Database Schema
-- MySQL Database Setup

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