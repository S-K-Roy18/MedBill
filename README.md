💊 MedBill – Medicine Billing & Inventory Management System

MedBill is a full-stack web application designed to manage medical store operations efficiently. It helps pharmacists handle inventory, generate bills, track sales, and manage authentication securely.

🌐 Live Demo

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
cd backend
npm install
3️⃣ Setup Environment Variables

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

Surya Kanta Roy

⭐ Support

If you like this project, give it a ⭐ on GitHub!
