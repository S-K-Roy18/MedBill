<<<<<<< HEAD
# 💊 MedBill — Medicine Billing & Inventory Management System

<div align="center">

![MedBill Banner](Images/logo.png)

**A full-stack web application built for modern pharmacy management.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-med--bill--nine.vercel.app-6366f1?style=for-the-badge)](https://med-bill-nine.vercel.app/)
[![Backend](https://img.shields.io/badge/⚙️_Backend-Render-22c55e?style=for-the-badge)](https://medbill-9eni.onrender.com/api/health)
[![GitHub](https://img.shields.io/badge/GitHub-S--K--Roy18-181717?style=for-the-badge&logo=github)](https://github.com/S-K-Roy18)

</div>
=======
💊 MedBill – Medicine Billing & Inventory Management System

MedBill is a full-stack web application designed to manage medical store operations efficiently. It helps pharmacists handle inventory, generate bills, track sales, and manage authentication securely.
>>>>>>> 9add6a7f43e8c76a95bd26d63eecf823714393da

🌐 Live Demo

<<<<<<< HEAD
## ✨ Features

| Module | Description |
|--------|-------------|
| 🧾 **Billing** | Create bills with multiple medicines, auto total calculation, stock deduction |
| 📦 **Inventory** | Add, edit, delete medicines with live stock alerts |
| 📊 **Analytics** | Revenue charts, top-selling drugs, fast/slow-moving analysis |
| 🗂️ **Sales History** | Search & filter past orders, view detailed bill modal |
| 🏠 **Dashboard** | Real-time stats — total bills, revenue, and products |
| 🔐 **Authentication** | JWT-secured login with bcrypt password hashing |
| ⚙️ **Settings** | Clinic info, user management, security, backup & activity logs |
| 🌙 **Dark / Light Mode** | Persists across all pages via `localStorage` |
| 📱 **Mobile Responsive** | Hamburger nav, slide-in sidebar drawer, bottom-sheet popups |

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 + CSS3 + Vanilla JavaScript**
- **Boxicons** & **Font Awesome** for icons
- **Google Fonts** (Inter, Outfit)
- Glassmorphism dark theme UI

### Backend
- **Node.js** + **Express.js**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Database
- **MongoDB Atlas** (cloud) via **Mongoose**

### Deployment
- **Frontend** → [Vercel](https://med-bill-nine.vercel.app/)
- **Backend** → [Render](https://medbill-9eni.onrender.com)

---

## 📁 Project Structure

```
MedBill/
│
├── 📄 index.html              ← Homepage (landing page)
├── 📄 Dashboard.html          ← Main dashboard with stats
├── 📄 Inventory.html          ← Inventory management
├── 📄 Billing.html            ← Bill creation
├── 📄 Saleshistory.html       ← Order history
├── 📄 Analytic.html           ← Business analytics
├── 📄 Setting.html            ← Settings page
├── 📄 Login.HTML              ← Login page
│
├── 📁 scripts/
│   ├── theme.js               ← Dark/light mode (shared)
│   ├── Dashboard.js           ← Sidebar & dark mode toggle
│   ├── Inventory.js           ← Inventory CRUD
│   ├── billing.js             ← Billing logic
│   └── Setting.js             ← Settings logic
│
├── 📁 Images/                 ← Logos, avatars, feature images
│
└── 📁 backend/
    ├── server.js              ← Express app entry point
    ├── seed.js                ← DB seeding script
    ├── .env                   ← Environment variables (not committed)
    ├── 📁 config/
    │   └── db.js              ← MongoDB connection
    ├── 📁 models/
    │   ├── Product.js
    │   ├── Bill.js
    │   └── User.js
    ├── 📁 controllers/
    │   ├── authController.js
    │   ├── productController.js
    │   ├── billController.js
    │   └── dashboardController.js
    ├── 📁 routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   ├── billRoutes.js
    │   └── dashboardRoutes.js
    └── 📁 middleware/
        ├── authMiddleware.js
        └── errorHandler.js
```

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/S-K-Roy18/MedBill.git
cd MedBill
```

### 2. Install Backend Dependencies

```bash
=======
🔗 Frontend (Vercel):
https://med-bill-nine.vercel.app/

🔗 Backend API (Render):
https://medbill-9eni.onrender.com/api

⚠️ Note: Backend may take 30–50 seconds to start (Render free tier cold start).

🚀 Features
🧾 Billing System
Generate bills with multiple medicines
Automatic total calculation
Real-time stock deduction after billing
📦 Inventory Management
Add, update, delete medicines
Track quantity and expiry date
Live inventory updates
🔍 Search & Autocomplete
Fast medicine search during billing
📊 Sales History
View previous bills
Filter and search records
📈 Dashboard & Analytics
Total bills, revenue, products
Low stock alerts
Best-selling medicines
🔐 Authentication
Secure login using JWT
Password hashing with bcrypt
🛠️ Tech Stack
Frontend
HTML
CSS
JavaScript
Backend
Node.js
Express.js
Database
MongoDB Atlas (Mongoose)
📁 Project Structure
backend/
├── config/db.js
├── models/
│   ├── Product.js
│   ├── Bill.js
│   └── User.js
├── controllers/
├── routes/
├── middleware/
├── seed.js
├── server.js
└── .env

frontend/
├── scripts/
│   ├── inventory.js
│   ├── billing.js
│   ├── Dashboard.js
│   └── other scripts
├── Login.html
├── Dashboard.html
├── Inventory.html
├── Billing.html
├── Saleshistory.html
├── Analytic.html
└── other UI files
⚙️ Installation & Setup (Local)
1️⃣ Clone the Repository
git clone https://github.com/S-K-Roy18/MedBill.git
cd MedBill
2️⃣ Install Backend Dependencies
>>>>>>> 9add6a7f43e8c76a95bd26d63eecf823714393da
cd backend
npm install
3️⃣ Setup Environment Variables

<<<<<<< HEAD
### 3. Configure Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medbill
JWT_SECRET=your_super_secret_key_here
```

> For production, use your **MongoDB Atlas** connection string.

### 4. Seed the Database

```bash
npm run seed
```

This creates 10 sample medicines and an **admin account**:

```
Username : admin
Password : Admin@123
```

### 5. Start the Backend

```bash
npm run dev
```

### 6. Open the App

Visit `http://localhost:5000/index.html` in your browser.
=======
Create a .env file in backend/:

PORT=5000
MONGO_URI=mongodb://localhost:27017/medbill
JWT_SECRET=your_secret_key
4️⃣ Start MongoDB

Make sure MongoDB is running locally.

5️⃣ Seed the Database
node seed.js
6️⃣ Run the Server
npm run dev
7️⃣ Open the Application
http://localhost:5000/Login.html
🔑 Default Login
Username: admin  
Password: Admin@123
🔌 API Endpoints
Products
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
Billing
POST /api/bills
GET  /api/bills
Authentication
POST /api/auth/login
POST /api/auth/register
📌 Important Notes
Backend is hosted on Render (may sleep when inactive)
Ensure frontend API URL is set correctly:
const API_URL = "https://medbill-9eni.onrender.com/api";
Remove dev fallback login before production
🚀 Future Improvements
📄 PDF bill generation
📉 Low stock alerts
📊 Advanced analytics dashboard
👥 Role-based access (admin/staff)
👨‍💻 Author
>>>>>>> 9add6a7f43e8c76a95bd26d63eecf823714393da

Surya Kanta Roy

<<<<<<< HEAD
## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login with username/email & password |
| `POST` | `/api/auth/register` | Register a new user |
| `GET`  | `/api/auth/seed` | Seed default admin (first-time setup) |
| `GET`  | `/api/products` | Get all medicines |
| `POST` | `/api/products` | Add a medicine |
| `PUT`  | `/api/products/:id` | Update a medicine |
| `DELETE` | `/api/products/:id` | Delete a medicine |
| `POST` | `/api/bills` | Create a new bill |
| `GET`  | `/api/bills` | Get all bills |
| `GET`  | `/api/dashboard` | Get dashboard stats |
| `GET`  | `/api/health` | Health check |

---

## 🚀 Deployment

### Frontend (Vercel)
Push to GitHub — Vercel auto-deploys from the `main` branch.  
Live: **https://med-bill-nine.vercel.app/**

### Backend (Render)
Set the following **Environment Variables** in your Render dashboard:

| Key | Value |
|-----|-------|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A long random secret string |
| `PORT` | `5000` (Render sets this automatically) |

After deploying, run the seed endpoint once to create the admin account:  
`https://medbill-9eni.onrender.com/api/auth/seed`

---

## 📌 Notes

- Stock is **automatically reduced** when a bill is generated
- The dark/light mode preference is **saved** and persists on all pages
- MongoDB Atlas requires your Render IP to be whitelisted (or use `0.0.0.0/0`)

---

## 👨‍💻 Author

**Surya Kanta Roy**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-surya--kanta--roy-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/surya-kanta-roy-363866338/)
[![GitHub](https://img.shields.io/badge/GitHub-S--K--Roy18-181717?style=flat&logo=github)](https://github.com/S-K-Roy18)
[![Gmail](https://img.shields.io/badge/Email-suryarahulroy321@gmail.com-D14836?style=flat&logo=gmail)](mailto:suryarahulroy321@gmail.com)

---

## ⭐ Support
=======
⭐ Support
>>>>>>> 9add6a7f43e8c76a95bd26d63eecf823714393da

If you like this project, give it a ⭐ on [GitHub](https://github.com/S-K-Roy18/MedBill)!
