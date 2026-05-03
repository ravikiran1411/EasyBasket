# 🛒 EasyBasket – Full Stack E-commerce Application

EasyBasket is a modern full-stack grocery shopping web application where users can browse products, manage cart, and place orders, while admins can efficiently manage products and orders.

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
* ⭐ Product Ratings & Reviews
* Persistent Cart (after refresh)

---

### 🧑‍💼 Admin Features

* Secure Admin Login
* Add New Products
* Upload Product Images (Cloudinary)
* Manage Products (CRUD)
* View Orders
* Update Order Status (Pending → Delivered)

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication

### Deployment

* Frontend & Admin Panel → Vercel
* Backend → Render

---

## 📂 Project Structure

```id="fullstruct"
EasyBasket/
│
├── frontend/
│   ├── src/
│   │   ├── assets/        # Images & icons
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Pages (Home, Cart, Profile, etc.)
│   │   ├── context/       # Global state (DataContext)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── admin/
│   ├── src/
│   │   ├── components/    # Admin UI components
│   │   ├── pages/         # Add Product, Orders, etc.
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── config/            # DB & Cloudinary config
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```id="envbackend"
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_secret_key

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### Frontend & Admin (.env)

```id="envfront"
VITE_BACKEND_URL=https://easybasket-backend.onrender.com
```

---

## 🧪 Run Locally

### 1. Clone Repository

```id="clone"
git clone https://github.com/your-username/EasyBasket.git
cd EasyBasket
```

### 2. Install Dependencies

```id="install"
cd frontend && npm install
cd ../admin && npm install
cd ../backend && npm install
```

### 3. Run Project

```id="run"
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

## 📸 Screenshots

(Add your screenshots here for better presentation)

---

## 📌 Future Improvements

* 💳 Razorpay Payment Integration
* 📦 Order Tracking System
* 🗺️ Map Integration (for delivery location & address selection)
* 📊 Admin Dashboard Analytics

---

## 🙌 Author

**Ravi Kiran**
GitHub: https://github.com/ravikiran1411

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
