# Royal Oak Pharmacy - Backend API

Backend API for the Royal Oak Pharmacy Management System built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization** - JWT-based authentication with role-based access control
- **User Management** - Manage users with different roles (admin, pharmacist, cashier, manager)
- **Medicine Inventory** - Complete CRUD operations for medicine management
- **Sales Management** - Record and track sales transactions with automatic inventory updates
- **Customer Management** - Maintain customer records and purchase history
- **Supplier Management** - Manage medicine suppliers and contact information
- **Prescription Management** - Track prescriptions and refills
- **Purchase Orders** - Create and manage purchase orders from suppliers
- **Reports & Analytics** - Generate various reports and statistics

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JSON Web Tokens** - Authentication
- **Bcrypt** - Password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/royal_oak_pharmacy
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
```

4. Make sure MongoDB is running

5. Seed the database with sample data:
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatepassword` - Update password

### Medicines
- `GET /api/medicines` - Get all medicines
- `GET /api/medicines/:id` - Get single medicine
- `POST /api/medicines` - Create medicine (Pharmacist+)
- `PUT /api/medicines/:id` - Update medicine (Pharmacist+)
- `DELETE /api/medicines/:id` - Delete medicine (Admin only)
- `GET /api/medicines/stats/summary` - Get medicine statistics

### Sales
- `GET /api/sales` - Get all sales
- `GET /api/sales/:id` - Get single sale
- `POST /api/sales` - Create sale
- `GET /api/sales/stats/summary` - Get sales statistics

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Suppliers
- `GET /api/suppliers` - Get all suppliers
- `GET /api/suppliers/:id` - Get single supplier
- `POST /api/suppliers` - Create supplier (Manager+)
- `PUT /api/suppliers/:id` - Update supplier (Manager+)
- `DELETE /api/suppliers/:id` - Delete supplier (Admin only)

### Prescriptions
- `GET /api/prescriptions` - Get all prescriptions
- `GET /api/prescriptions/:id` - Get single prescription
- `POST /api/prescriptions` - Create prescription (Pharmacist+)
- `PUT /api/prescriptions/:id/fill` - Mark prescription as filled

### Purchases
- `GET /api/purchases` - Get all purchase orders
- `POST /api/purchases` - Create purchase order (Manager+)
- `PUT /api/purchases/:id/receive` - Receive purchase order

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user (Admin only)
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Reports
- `GET /api/reports/dashboard` - Get dashboard summary
- `GET /api/reports/sales` - Get sales report
- `GET /api/reports/inventory` - Get inventory report
- `GET /api/reports/top-selling` - Get top selling medicines

## User Roles

- **Admin** - Full access to all features
- **Manager** - Can manage inventory, suppliers, purchases
- **Pharmacist** - Can manage medicines, prescriptions, sales
- **Cashier** - Can process sales, view inventory

## Demo Accounts

After running `npm run seed`, you can use these accounts:

- Admin: `admin / admin123`
- Pharmacist: `pharmacist / pharma123`
- Cashier: `cashier / cash123`

## Project Structure

```
backend/
├── models/           # Mongoose models
│   ├── User.js
│   ├── Medicine.js
│   ├── Sale.js
│   ├── Customer.js
│   ├── Supplier.js
│   ├── Prescription.js
│   └── Purchase.js
├── routes/           # API routes
│   ├── auth.js
│   ├── medicines.js
│   ├── sales.js
│   ├── customers.js
│   ├── suppliers.js
│   ├── prescriptions.js
│   ├── purchases.js
│   ├── users.js
│   └── reports.js
├── middleware/       # Custom middleware
│   └── auth.js
├── scripts/          # Utility scripts
│   └── seedDatabase.js
├── .env              # Environment variables
├── server.js         # Express app entry point
└── package.json
```

## Development

```bash
npm run dev     # Start with nodemon (auto-restart)
npm start       # Start in production
npm run seed    # Seed database with sample data
```

## License

MIT
