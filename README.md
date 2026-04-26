# 💊 MedBill – Medicine Billing & Inventory Management System

MedBill is a full-stack web application designed to manage medical store operations efficiently. It allows users to manage inventory, generate bills, track medicines availability track sales history, and handle authentication securely.

---

## 🚀 Features

* 🧾 **Billing System**

  * Generate bills with multiple medicines
  * Automatic total calculation
  * Stock deduction after billing

* 📦 **Inventory Management**

  * Add, update, delete medicines
  * Track quantity and expiry date
  * Real-time inventory updates

* 🔍 **Search & Autocomplete**

  * Quickly search medicines while billing

* 📊 **Sales History**

  * View previous bills
  * Filter and search records

* 🔐 **Authentication**

  * Secure login using JWT
  * Password hashing with bcrypt

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

## 📁 Project Structure

```
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
│   └── billing.js
├── Login.html
├── Saleshistory.html
└── other UI files
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/S-K-Roy18/MedBill.git
cd MedBill
```

---

### 2️⃣ Install Dependencies

```bash
cd backend
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/medbill
JWT_SECRET=your_secret_key
```

---

### 4️⃣ Start MongoDB

Make sure MongoDB is running locally.

---

### 5️⃣ Seed the Database

```bash
node seed.js
```

---

### 6️⃣ Run the Server

```bash
npm run dev
```

---

### 7️⃣ Open the Application

Open `Login.html` in your browser.

---

## 🔑 Default Login

```
Username: admin
Password: Admin@123
```

---

## 🔌 API Endpoints

### Products

* `GET /api/products`
* `POST /api/products`
* `PUT /api/products/:id`
* `DELETE /api/products/:id`

### Billing

* `POST /api/bills`
* `GET /api/bills`

### Authentication

* `POST /api/auth/login`
* `POST /api/auth/register`

---

## 🧪 Testing

You can test APIs using Postman:

* Add products
* Create bills
* Verify stock deduction
* Check sales history

---

## 📌 Important Notes

* Ensure MongoDB is running before starting the server
* Stock is automatically reduced when a bill is created
* Backend must be running for full functionality

---

## 🚀 Future Improvements

* 📄 PDF bill generation
* 📉 Low stock alerts
* 📊 Dashboard analytics
* 🌐 Deployment (Render / Netlify)

---

## 👨‍💻 Author

**Surya Kanta Roy**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
