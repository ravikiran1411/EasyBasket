# 🛒 EasyBasket – Multi-Vendor Grocery Marketplace

EasyBasket is a modern full-stack grocery marketplace built using the MERN stack. Users can browse products, manage carts, place orders, and review products, while vendors can create stores, manage inventory, and maintain their own products.

---

## 🌐 Live Links

* 🛍️ User App: https://easybasket.vercel.app
* 🧑‍💼 Admin Panel: https://easybasket-adminpanel.vercel.app
* ⚙️ Backend API: https://easybasket-backend.onrender.com

---

## 🚀 Features

### 👤 User Features

* User Signup & Login (JWT Authentication)
* Browse Products by Categories
* Search Products
* Add to Cart & Update Quantity
* Place Orders
* View Profile Details
* Product Ratings & Reviews
* Persistent Cart (after refresh)

---

### 🏪 Vendor Features

* Create Vendor Account
* Create & Manage Store
* Update Store Details
* Add Products
* Edit Products
* Delete Products
* View Vendor Products
* Product Ownership Validation
* Secure Vendor Authorization

---

### 🧑‍💼 Admin Features

* Secure Admin Login
* Manage Platform
* View Orders
* Delete products
* Update Order Status (Placed → Delivered)

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Router
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Cloudinary
* Multer

### Deployment

* Frontend & Admin Panel → Vercel
* Backend → Render

---

## 🏗️ Architecture

```text
User
 ├── Browse Products
 ├── Cart & Orders
 └── Reviews

Vendor
 ├── Create Store
 ├── Manage Store
 ├── Add Products
 ├── Edit Products
 └── Delete Products

Admin
 ├── Manage Platform
 └── Monitor Orders
```

---

## 📂 Project Structure

```text
EasyBasket/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── admin/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   │   ├── userModel.js
│   │   ├── adminModel.js
│   │   ├── storeModel.js
│   │   └── productModel.js
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```env
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_secret_key

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend & Admin (.env)

```env
VITE_BACKEND_URL=https://easybasket-backend.onrender.com
```

---

## 🧪 Run Locally

### Clone Repository

```bash
git clone https://github.com/your-username/EasyBasket.git
cd EasyBasket
```

### Install Dependencies

```bash
cd frontend && npm install
cd ../admin && npm install
cd ../backend && npm install
```

### Run Project

```bash
# Backend
cd backend
npm run server

# Frontend
cd frontend
npm run dev

# Admin Panel
cd admin
npm run dev
```

---

## 🔒 Security Features

* JWT Authentication
* Protected Routes
* Vendor Authorization Middleware
* Product Ownership Validation
* Store Ownership Validation

---

## 📌 Upcoming Features

### Hyperlocal Delivery System

* User Location Detection
* Nearby Store Discovery
* Nearby Product Filtering
* 10-Minute Delivery Simulation
* Service Availability Check

### Future Enhancements

* Razorpay Payment Integration
* Vendor Dashboard Analytics
* Order Tracking System
* Real-Time Notifications
* Store Logos & Branding
* Geospatial Search using MongoDB

---

## 🙌 Author

**Ravi Kiran**

GitHub: https://github.com/ravikiran1411

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
