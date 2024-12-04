# Royal Oak Pharmacy Management System - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

### Check Installations
```bash
node --version    # Should show v14+
npm --version     # Should show 6+
mongo --version   # Should show MongoDB version
git --version     # Should show Git version
```

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- express-validator
- morgan
- nodemon (dev dependency)

### Step 3: Configure Environment Variables
The `.env` file is already created with default settings:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/royal_oak_pharmacy
JWT_SECRET=royal-oak-pharmacy-secret-key-2024
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

**For production, change JWT_SECRET to a strong random string!**

### Step 4: Verify Backend Structure
Your backend folder should look like this:
```
backend/
├── models/
├── routes/
├── middleware/
├── scripts/
├── .env
├── .env.example
├── server.js
├── package.json
└── README.md
```

## Database Setup

### Step 1: Start MongoDB

**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or run MongoDB manually
"C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
```

**Mac/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or use Homebrew (Mac)
brew services start mongodb-community
```

### Step 2: Verify MongoDB is Running
```bash
# Connect to MongoDB shell
mongo

# Or mongosh for newer versions
mongosh
```

You should see a connection message. Type `exit` to leave the shell.

### Step 3: Seed the Database
```bash
cd backend
npm run seed
```

This will create:
- ✅ 3 demo users (admin, pharmacist, cashier)
- ✅ 2 suppliers
- ✅ 6 medicines with different stock levels
- ✅ 3 customers

**Demo Account Credentials:**
- Admin: `admin / admin123`
- Pharmacist: `pharmacist / pharma123`
- Cashier: `cashier / cash123`

## Frontend Setup

### Option 1: Using Existing HTML/CSS/JS (Simple)
The current frontend is already set up in the root directory:
- Open `index.html` in a browser
- Or use Live Server extension in VS Code

### Option 2: React Frontend (Advanced - Recommended for Full Features)

To create a React frontend:

```bash
# From project root
npx create-react-app frontend
cd frontend
npm install axios react-router-dom recharts lucide-react tailwindcss
```

**Note:** A complete React frontend implementation would require additional development time.
For demonstration purposes, you can use API testing tools like Postman or Thunder Client.

## Running the Application

### Start Backend Server

```bash
# Terminal 1 - Backend
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📍 Environment: development
🌐 API URL: http://localhost:5000
✅ MongoDB Connected Successfully
```

### Test API Endpoints

**Method 1: Using Browser**
- Open `http://localhost:5000`
- You'll see the API welcome message with all endpoints

**Method 2: Using curl**
```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Method 3: Using Postman/Thunder Client**
1. Install Postman or Thunder Client (VS Code extension)
2. Import the API endpoints
3. Test authentication and CRUD operations

### Test Frontend (Current HTML Version)

1. Open `index.html` in a browser
2. Or right-click in VS Code → "Open with Live Server"
3. The dashboard will load with statistics from localStorage

## API Testing Guide

### 1. Login and Get Token
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Copy the `token` from the response.

### 2. Get All Medicines (Protected Route)
```bash
GET http://localhost:5000/api/medicines
Authorization: Bearer {your-token-here}
```

### 3. Create a Sale
```bash
POST http://localhost:5000/api/sales
Authorization: Bearer {your-token-here}
Content-Type: application/json

{
  "customerName": "John Doe",
  "items": [
    {
      "medicine": "{medicine-id-from-get-medicines}",
      "quantity": 2
    }
  ],
  "paymentMethod": "cash"
}
```

## Project Structure

```
pharmacy/
├── backend/                 # Node.js + Express API
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── scripts/            # Database seed scripts
│   ├── .env                # Environment variables
│   └── server.js           # Express server
│
├── frontend/               # React app (to be created)
│
├── assets/                 # Static HTML version assets
│   ├── css/
│   ├── js/
│   └── images/
│
├── pages/                  # Static HTML pages
├── index.html              # Static homepage
├── README.md               # Project documentation
└── SETUP_GUIDE.md          # This file
```

## Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB Connection Error
```
**Solution:**
1. Check if MongoDB is running: `mongo` or `mongosh`
2. Verify MONGODB_URI in `.env`
3. Check MongoDB service is started

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
1. Change PORT in `.env` to another port (e.g., 5001)
2. Or kill the process using port 5000:
   - Windows: `netstat -ano | findstr :5000` then `taskkill /PID {PID} /F`
   - Mac/Linux: `lsof -i :5000` then `kill -9 {PID}`

### JWT Token Errors
```
Error: Not authorized to access this route
```
**Solution:**
1. Make sure you're sending the token in headers:
   `Authorization: Bearer {token}`
2. Check if token is expired (default 7 days)
3. Login again to get a new token

### Dependency Installation Fails
```
npm ERR! code ERESOLVE
```
**Solution:**
```bash
npm install --legacy-peer-deps
```

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. ✅ Backend API is ready and running
2. ✅ Database is seeded with sample data
3. ✅ Authentication is working
4. 🔄 Optional: Build React frontend for modern UI
5. 🔄 Optional: Add more features (barcode scanning, PDF export, etc.)

## For Your Instructor Demo

### What to Show:
1. **Backend API** running on port 5000
2. **MongoDB** with seeded data
3. **API Testing** using Postman/Thunder Client
4. **Authentication** with JWT tokens
5. **CRUD Operations** on medicines, sales, customers
6. **Reports** and analytics endpoints
7. **Role-based Access Control** (try different user roles)

### Demo Flow:
1. Start MongoDB and Backend server
2. Open Postman/Thunder Client
3. Login as admin
4. Show GET all medicines
5. Create a new medicine
6. Create a sale
7. Generate reports
8. Show the database in MongoDB Compass

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review backend logs in terminal
3. Check MongoDB logs
4. Verify environment variables

---

**Royal Oak Pharmacy Management System** - Professional Full-Stack Application
