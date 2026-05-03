# 🛒 EasyBasket – Full Stack E-commerce Application

EasyBasket is a full-stack grocery shopping web application where users can browse products, add them to cart, and place orders, while admins can manage products and orders.

---

## 🌐 Live Links

* 🛍️ User App: https://easybasket.vercel.app
* 🧑‍💼 Admin Panel: https://easybasket-adminpanel.vercel.app
* ⚙️ Backend API: https://easybasket-backend.onrender.com

---

## 🚀 Features

### 👤 User Features

* User Signup & Login
* Browse Products by Category
* Search Products
* Add to Cart / Update Quantity
* Place Orders
* View Profile Details

---

### 🧑‍💼 Admin Features

* Admin Login
* Add New Products
* Upload Product Images
* Manage Products
* View Orders

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

```
EasyBasket/
│
├── frontend/      # User Application
├── admin/         # Admin Panel
├── backend/       # Server & APIs
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
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

```
VITE_BACKEND_URL=https://easybasket-backend.onrender.com
```

---

## 🧪 Run Locally

### 1. Clone Repository

```
git clone https://github.com/your-username/EasyBasket.git
cd EasyBasket
```

### 2. Install Dependencies

```
cd frontend && npm install
cd ../admin && npm install
cd ../backend && npm install
```

### 3. Run Project

```
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
* ⭐ Product Ratings & Reviews
* 📊 Admin Dashboard Analytics

---

## 🙌 Author

**Ravi Kiran**
GitHub: https://github.com/ravikiran1411

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
