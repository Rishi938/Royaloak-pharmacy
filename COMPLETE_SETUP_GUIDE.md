# 🚀 Royal Oak Pharmacy - Complete Professional Setup Guide

## ⚡ Quick Start (5 Minutes)

### Step 1: Start MongoDB
```bash
net start MongoDB
```

### Step 2: Install & Start Backend
```bash
cd backend
npm install
npm run seed
npm run dev
```

Keep this terminal open! You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
```

### Step 3: Install & Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```

Browser opens automatically to http://localhost:3000

### Step 4: Login
- Username: `admin`
- Password: `admin123`

---

## 🎯 All Working Features

### ✅ Authentication
- ✓ Secure JWT login
- ✓ Role-based access (Admin, Pharmacist, Cashier)
- ✓ Auto-logout on session expire

### ✅ Dashboard
- ✓ Real-time statistics from database
- ✓ Total medicines count
- ✓ Low stock alerts
- ✓ Today's sales total
- ✓ Customer count
- ✓ Quick action buttons

### ✅ Medicine Management (FULLY WORKING)
- ✓ View all medicines
- ✓ Add new medicine (complete form)
- ✓ Search medicines
- ✓ Filter by category
- ✓ Delete medicine
- ✓ Stock status indicators
- ✓ Prescription badges
- ✓ Expiry date tracking

### ✅ Sales Management (FULLY WORKING)
- ✓ Create new sale
- ✓ Shopping cart system
- ✓ Add multiple items
- ✓ Real-time total calculation
- ✓ Stock validation
- ✓ Invoice generation
- ✓ Auto inventory update
- ✓ Sales history

### ✅ Customer Management
- ✓ View all customers
- ✓ Add new customer
- ✓ Search customers
- ✓ Customer details
- ✓ Purchase history

### ✅ Supplier Management
- ✓ View suppliers
- ✓ Supplier details

---

## 🎓 Demo Flow for Instructor

### 1. **Login** (30 seconds)
- Show login page
- Enter: admin / admin123
- Show successful login

### 2. **Dashboard** (1 minute)
- Point out statistics
- Show they update in real-time
- Click quick actions

### 3. **Medicines** (2 minutes)
- Show existing medicines
- Click "+ Add New Medicine"
- Fill form:
  - Name: Aspirin 100mg
  - Category: Painkiller
  - Manufacturer: HealthCorp
  - Batch: ASP2024
  - Quantity: 100
  - Unit Price: 0.50
  - Selling Price: 1.00
  - Future expiry date
- Save and show it appears
- Demo search: type "Aspirin"
- Demo filter: select "Painkiller"
- Show stock status colors

### 4. **Sales** (3 minutes)
- Click "+ New Sale"
- Enter customer: John Smith
- Add to cart:
  - Medicine: Paracetamol
  - Quantity: 2
  - Click "Add to Cart"
- Add another item:
  - Medicine: Vitamin C
  - Quantity: 1
  - Click "Add to Cart"
- Show total calculating
- Click "Complete Sale"
- Show success with invoice number
- Show sale in history
- **Go back to Medicines** - Show stock reduced!

### 5. **Customers** (1 minute)
- Show customer list
- Show search functionality

---

## 💡 Key Selling Points

Tell your instructor:

1. **"I built a full-stack MERN application"**
   - MongoDB database
   - Express backend API
   - React frontend
   - Node.js server

2. **"Implements industry-standard features"**
   - JWT authentication
   - RESTful API
   - CRUD operations
   - Real-time data sync

3. **"Professional-grade functionality"**
   - Shopping cart logic
   - Inventory management
   - Invoice generation
   - Search and filtering
   - Form validation

4. **"Production-ready code"**
   - Error handling
   - Loading states
   - Responsive design
   - Clean code structure

---

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

### Backend errors
```bash
cd backend
npm install
npm run seed
npm run dev
```

### MongoDB not connecting
```bash
net start MongoDB
```

### Still having issues?
1. Restart VS Code
2. Close all terminals
3. Start fresh from Step 1

---

## 📊 What the Instructor Will See

1. **Professional UI**
   - Clean, modern design
   - Intuitive navigation
   - Responsive layout

2. **Working Features**
   - Everything actually works!
   - Real database integration
   - Live data updates

3. **Technical Skills**
   - Frontend: React, JSX, Hooks
   - Backend: Node.js, Express, REST API
   - Database: MongoDB, Mongoose
   - Authentication: JWT, bcrypt
   - Version Control: Git with proper commits

---

## 🎯 If Anything Breaks During Demo

**Stay calm and say:**
"I can show you the code instead - here's how the API works..."

Then show:
1. Backend routes in `backend/routes/`
2. React components in `frontend/src/`
3. Git commits: `git log --oneline`

---

## ✅ Final Checklist Before Demo

- [ ] MongoDB running
- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3000)
- [ ] Can login successfully
- [ ] Dashboard shows data
- [ ] Can add a medicine
- [ ] Can create a sale
- [ ] Inventory updates after sale

**You're ready!** 🎉
