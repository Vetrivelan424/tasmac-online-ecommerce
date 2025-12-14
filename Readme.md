# 🚀 TASMAC E-Online

## 📋 Prerequisites

- Node.js v16+ installed
- MySQL Server installed
- Git (optional)
- Code editor (VS Code recommended)

---

## 🗄️ STEP 1: Database Setup

### 1.1 Create Database

```bash
# Create database
CREATE DATABASE tasmac_online;
USE tasmac_online;
```

### 1.2 Run Database Schema

Copy and run the following SQL script:

```sql
-- Products Table
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  category ENUM('Whisky', 'Brandy', 'Rum', 'Vodka', 'Gin', 'Beer', 'Wine') NOT NULL,
  volume VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  description TEXT,
  alcohol_percentage DECIMAL(4, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(15) NOT NULL,
  delivery_address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  district VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  pincode VARCHAR(10) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('COD', 'Card', 'UPI') NOT NULL,
  payment_status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
  order_status ENUM('Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Placed',
  delivery_validation_status ENUM('Valid', 'Invalid', 'Out_of_State') DEFAULT 'Valid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price_per_unit DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insert Sample Products
INSERT INTO products (name, brand, category, volume, price, stock_quantity, image_url, description, alcohol_percentage) VALUES
('Royal Challenge Whisky', 'Royal Challenge', 'Whisky', '750ml', 950.00, 100, 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400', 'Premium blended Scotch whisky', 42.8),
('Old Monk Rum', 'Old Monk', 'Rum', '750ml', 650.00, 150, 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400', 'Dark rum aged for 7 years', 42.8),
('Signature Whisky', 'Signature', 'Whisky', '750ml', 1200.00, 80, 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400', 'Premium Indian whisky', 42.8),
('McDowell No.1 Brandy', 'McDowell', 'Brandy', '750ml', 850.00, 120, 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400', 'Smooth brandy', 42.8),
('Smirnoff Vodka', 'Smirnoff', 'Vodka', '750ml', 1100.00, 90, 'https://images.unsplash.com/photo-1560508196-18f90b601e3d?w=400', 'Triple distilled vodka', 40.0),
('Bacardi White Rum', 'Bacardi', 'Rum', '750ml', 1050.00, 110, 'https://images.unsplash.com/photo-1574096079513-d8259312b785?w=400', 'Light and smooth white rum', 40.0),
('Teachers Whisky', 'Teachers', 'Whisky', '750ml', 1350.00, 70, 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=400', 'Highland Cream Scotch', 43.0),
('Kingfisher Beer', 'Kingfisher', 'Beer', '650ml', 180.00, 200, 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400', 'Premium lager beer', 5.0);
```

---

## 🔧 STEP 2: Backend Setup

### 2.1 Create Project Structure

```bash
cd Tasmac Online
cd server
```

### 2.2 Initialize Node Project

```bash
npm init -y
```

### 2.3 Install Dependencies

```bash
npm install 
npm install --save-dev nodemon
```

### 2.4 Create Files

Create the following files in `server/`:

#### server/.env
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=tasmac_ecommerce
NODE_ENV=development
```

```bash
npm run dev
```

Server should start on http://localhost:5000

**Test the API:**
```bash
curl http://localhost:5000/health
```

---

## 💻 STEP 3: Frontend Setup

### 3.1 Create Frontend Structure

```bash
cd ../
cd client
```

### 3.2 Initialize React Project

```bash
npm init -y
```

### 3.3 Install Dependencies

```bash
# Core dependencies
npm install i
# Dev dependencies
npm install i --save-dev 
```

### 3.4 Create Configuration Files

#### client/.env
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 3.5 Start Frontend

```bash
npm start
```

App should open at http://localhost:3000

---

### 4.1 Frontend Features

1. ✅ Browse products
2. ✅ Filter by category
3. ✅ Search products
4. ✅ Add to cart
5. ✅ Update quantities
6. ✅ Remove from cart
7. ✅ Proceed to checkout
8. ✅ Fill customer details
9. ✅ Fill address (Tamil Nadu only)
10. ✅ Select payment method
11. ✅ Place order
12. ✅ View order confirmation

---

## 📁 Complete File Structure

```
tasmac_online/
├── tasmac_server/
│   ├── src/
│   │   ├── config/
│   │   │   └── config.js
│   │   ├── db/
│   │   │   └── db-knex-connection.js
│   │   ├── models/
│   │   │   ├── product.model.js
│   │   │   └── order.model.js
│   │   ├── controllers/
│   │   │   ├── product.controller.js
│   │   │   └── order.controller.js
│   │   └── routes/
│   │       └── index.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── tasmac_client/
    ├── src/
    │   ├── components/
    │   │   ├── LayoutModule/
    │   │   │   ├── Header.js
    │   │   │   ├── Footer.js
    │   │   │   └── Navbar.js
    │   │   ├── ProductModule/
    │   │   │   ├── ProductList.js
    │   │   │   └── ProductCard.js
    │   │   ├── CartModule/
    │   │   │   ├── Cart.js
    │   │   │   └── CartItem.js
    │   │   └── CheckoutModule/
    │   │       ├── Checkout.js
    │   │       ├── AddressForm.js
    │   │       ├── PaymentForm.js
    │   │       └── OrderSuccess.js
    │   ├── redux/
    │   │   ├── store.js
    │   │   ├── cartSlice.js
    │   │   ├── productSlice.js
    │   │   └── orderSlice.js
    │   ├── services/
    │   │   ├── productService.js
    │   │   └── orderService.js
    │   ├── utils/
    │   │   ├── validation.js
    │   │   └── helpers.js
    │   ├── config/
    │   │   └── api.config.js
    │   ├── axios/
    │   │   └── axiosInstance.js
    │   ├── styles/
    │   │   └── main.css
    │   ├── App.js
    │   └── index.js
    ├── webpack/
    │   ├── webpack.common.js
    │   ├── webpack.dev.js
    │   ├── webpack.prod.js
    │   └── webpack.config.js
    ├── public/
    │   └── index.html
    ├── .env
    └── package.json
```

## 📊 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/orders` | Create new order |
| GET | `/api/orders/:id` | Get order by ID |
| GET | `/api/orders/number/:orderNumber` | Get order by number |
| POST | `/api/orders/validate-address` | Validate delivery address |

---

## ✅ Features Checklist

- [x] Product listing with images
- [x] Category filters
- [x] Search functionality
- [x] Add to cart
- [x] Cart management
- [x] Guest checkout
- [x] Tamil Nadu address validation
- [x] Multiple payment options
- [x] Order creation
- [x] Order confirmation
- [x] Responsive design
- [x] Form validation
- [x] Stock management
- [x] Error handling

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**License:** MIT

**🎉 TASMAC E-commerce application is ready to impress!**
