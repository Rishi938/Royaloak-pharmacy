# Royal Oak Pharmacy Management System

A **professional full-stack** pharmacy management system with modern backend API, database integration, and user authentication. This system allows pharmacy staff to manage inventory, sales, customers, suppliers, prescriptions, and generate comprehensive reports.

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express** - RESTful API server
- **MongoDB** + **Mongoose** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing and security

### Frontend
- **HTML5** + **CSS3** + **JavaScript** - Responsive web interface
- **(Optional) React.js** - Modern UI framework

## ✨ Key Features

### 🔐 Authentication & Authorization
- Secure JWT-based login system
- Role-based access control (Admin, Pharmacist, Manager, Cashier)
- Protected API routes
- Password encryption with bcrypt

### 💊 Medicine & Inventory Management
- Complete CRUD operations for medicines
- Batch number and expiry date tracking
- Automatic low stock alerts
- Barcode support
- Stock status indicators
- Supplier tracking
- Category-based filtering

### 💰 Sales Management
- Create sales transactions with invoice generation
- Automatic inventory deduction
- Multiple payment methods
- Customer purchase tracking
- Sales history and analytics
- Tax calculations

### 👥 Customer Management
- Comprehensive customer profiles
- Contact information and addresses
- Medical history and allergies
- Insurance information
- Loyalty points tracking
- Purchase history

### 🏭 Supplier Management
- Supplier contact details
- Payment terms and credit limits
- Outstanding balance tracking
- Supplier ratings
- Bank account information

### 📋 Prescription Management
- Electronic prescription tracking
- Doctor information
- Medication dosage and instructions
- Refill management
- Prescription status tracking

### 📦 Purchase Order Management
- Create and track purchase orders
- Supplier order management
- Automatic inventory updates on receipt
- Payment tracking

### 📊 Reports & Analytics
- Dashboard with key metrics
- Sales reports with date filtering
- Inventory valuation reports
- Top-selling medicines
- Expiry tracking reports
- Low stock alerts

## 📁 Project Structure

```
pharmacy/
├── backend/                    # Node.js Backend API
│   ├── models/                # Mongoose database models
│   │   ├── User.js           # User authentication model
│   │   ├── Medicine.js       # Medicine inventory model
│   │   ├── Sale.js           # Sales transaction model
│   │   ├── Customer.js       # Customer information model
│   │   ├── Supplier.js       # Supplier management model
│   │   ├── Prescription.js   # Prescription tracking model
│   │   └── Purchase.js       # Purchase order model
│   │
│   ├── routes/                # API endpoints
│   │   ├── auth.js           # Authentication routes
│   │   ├── medicines.js      # Medicine CRUD routes
│   │   ├── sales.js          # Sales management routes
│   │   ├── customers.js      # Customer management routes
│   │   ├── suppliers.js      # Supplier management routes
│   │   ├── prescriptions.js  # Prescription routes
│   │   ├── purchases.js      # Purchase order routes
│   │   ├── users.js          # User management routes
│   │   └── reports.js        # Reports and analytics routes
│   │
│   ├── middleware/            # Custom middleware
│   │   └── auth.js           # JWT authentication middleware
│   │
│   ├── scripts/               # Utility scripts
│   │   └── seedDatabase.js   # Database seeding script
│   │
│   ├── .env                   # Environment variables
│   ├── .env.example          # Environment template
│   ├── server.js             # Express server entry point
│   ├── package.json          # Backend dependencies
│   └── README.md             # Backend documentation
│
├── frontend/                  # React Frontend (optional)
│
├── assets/                    # Static HTML version assets
│   ├── css/                  # Stylesheets
│   ├── js/                   # JavaScript files
│   └── images/               # Images and logos
│
├── pages/                     # Static HTML pages
├── index.html                 # Static homepage
├── README.md                  # This file
├── SETUP_GUIDE.md            # Detailed setup instructions
└── .gitignore
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/Rishi938/Royaloak-pharmacy.git
cd pharmacy
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Start MongoDB**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

4. **Seed the database**
```bash
npm run seed
```

5. **Start the backend server**
```bash
npm run dev
```

Server will run at `http://localhost:5000`

### Demo Accounts

After seeding, use these credentials to login:

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Pharmacist | pharmacist | pharma123 |
| Cashier | cashier | cash123 |

## 📖 Detailed Documentation

For complete setup instructions, see **[SETUP_GUIDE.md](SETUP_GUIDE.md)**

For backend API documentation, see **[backend/README.md](backend/README.md)**

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

### Medicines
- `GET /medicines` - Get all medicines
- `POST /medicines` - Create medicine
- `PUT /medicines/:id` - Update medicine
- `DELETE /medicines/:id` - Delete medicine

### Sales
- `GET /sales` - Get all sales
- `POST /sales` - Create sale
- `GET /sales/stats/summary` - Get sales statistics

### Customers
- `GET /customers` - Get all customers
- `POST /customers` - Create customer

### Suppliers
- `GET /suppliers` - Get all suppliers
- `POST /suppliers` - Create supplier

### Prescriptions
- `GET /prescriptions` - Get all prescriptions
- `POST /prescriptions` - Create prescription

### Purchase Orders
- `GET /purchases` - Get all purchase orders
- `POST /purchases` - Create purchase order

### Reports
- `GET /reports/dashboard` - Dashboard summary
- `GET /reports/sales` - Sales report
- `GET /reports/inventory` - Inventory report
- `GET /reports/top-selling` - Top selling medicines

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer {your-jwt-token}
```

## 👥 User Roles & Permissions

| Feature | Admin | Pharmacist | Manager | Cashier |
|---------|-------|-----------|---------|---------|
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| Manage Medicines | ✅ | ✅ | ✅ | ❌ |
| Create Sales | ✅ | ✅ | ✅ | ✅ |
| Manage Suppliers | ✅ | ❌ | ✅ | ❌ |
| Manage Prescriptions | ✅ | ✅ | ❌ | ❌ |
| Purchase Orders | ✅ | ❌ | ✅ | ❌ |
| View Reports | ✅ | ✅ | ✅ | ✅ |

## 🧪 Testing the API

### Using Postman/Thunder Client

1. **Login to get token**
```json
POST http://localhost:5000/api/auth/login
{
  "username": "admin",
  "password": "admin123"
}
```

2. **Get all medicines** (requires token)
```
GET http://localhost:5000/api/medicines
Authorization: Bearer {token}
```

3. **Create a sale** (requires token)
```json
POST http://localhost:5000/api/sales
Authorization: Bearer {token}
{
  "customerName": "John Doe",
  "items": [
    {
      "medicine": "medicine_id_here",
      "quantity": 2
    }
  ],
  "paymentMethod": "cash"
}
```

## 📊 Database Schema

The system uses MongoDB with the following collections:
- **users** - User accounts and authentication
- **medicines** - Medicine inventory
- **sales** - Sales transactions
- **customers** - Customer information
- **suppliers** - Supplier details
- **prescriptions** - Prescription records
- **purchases** - Purchase orders

## 🌟 Features Highlight

### Automatic Inventory Management
- Stock automatically decreases when sales are made
- Stock automatically increases when purchases are received
- Low stock alerts when inventory reaches reorder level

### Smart Expiry Tracking
- Medicines expiring in 30 days are flagged
- Expired medicines are tracked separately
- Automated expiry reports

### Invoice Generation
- Automatic invoice number generation
- Format: `INV-YYYYMM-00001`

### Security Features
- Password hashing with bcrypt
- JWT token expiration
- Role-based access control
- Protected API routes

## 🚧 Future Enhancements

- [ ] React.js frontend with modern UI
- [ ] PDF invoice generation
- [ ] CSV/Excel export functionality
- [ ] Barcode scanning integration
- [ ] Email notifications for low stock
- [ ] Advanced charts and graphs
- [ ] Mobile app (React Native)
- [ ] Multi-language support

## 📝 Sample Data

The database seed includes:
- ✅ 3 Users (admin, pharmacist, cashier)
- ✅ 2 Suppliers
- ✅ 6 Medicines (with various stock levels)
- ✅ 3 Customers

## 🐛 Troubleshooting

**MongoDB Connection Error?**
- Ensure MongoDB is running
- Check MONGODB_URI in `.env`

**Port Already in Use?**
- Change PORT in `.env`
- Kill process using the port

**Authentication Issues?**
- Check if token is properly formatted
- Ensure token hasn't expired

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting.

## 📄 License

This project is for educational and management purposes.

## 👨‍💻 Author

Developed as a comprehensive pharmacy management solution.

## 🌐 Repository

GitHub: [https://github.com/Rishi938/Royaloak-pharmacy](https://github.com/Rishi938/Royaloak-pharmacy)

---

**Royal Oak Pharmacy Management System** - Professional Full-Stack Application with Backend API, Database, and Authentication
