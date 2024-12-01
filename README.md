# Royal Oak Pharmacy Management System

A web-based pharmacy management system designed to help manage inventory, sales, customers, and generate reports for Royal Oak Pharmacy.

## Project Overview

This is a simple and user-friendly pharmacy management system built using HTML, CSS, and JavaScript. The system allows pharmacy staff to manage their daily operations including tracking medicine inventory, recording sales, maintaining customer records, and generating various reports.

## Features

### 1. Dashboard
- Overview of key metrics (total medicines, low stock items, today's sales, total customers)
- Recent activity feed showing latest sales transactions
- Quick navigation to all main features

### 2. Inventory Management
- Add new medicines to inventory
- View all medicines with details (name, category, quantity, price, expiry date)
- Edit medicine quantities
- Delete medicines from inventory
- Search medicines by name or category
- Filter medicines by category
- Automatic low stock warnings
- Stock status indicators (Good Stock, Low Stock, Critical)

### 3. Sales Management
- Create new sales transactions
- Select medicines from available inventory
- Automatic stock deduction on sale
- View recent sales history
- Today's sales summary (total revenue and transaction count)
- Customer name tracking for each sale

### 4. Customer Management
- Add new customers with contact information
- View all registered customers
- Edit customer details
- Delete customer records
- Search customers by name, email, or phone
- Track total purchases per customer

### 5. Reports & Analytics
- Inventory status report
- Sales report with date range filtering
- Medicine expiry report (expired, expiring soon, expiring in 60 days)
- Summary statistics (total inventory value, low stock count, expiring items)

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and responsive design
- **JavaScript (Vanilla)**: Functionality and interactivity
- **LocalStorage**: Client-side data persistence

## File Structure

```
pharmacy/
│
├── index.html                 # Homepage with dashboard
├── README.md                  # Project documentation
│
├── assets/
│   ├── css/
│   │   └── style.css         # Main stylesheet
│   │
│   ├── js/
│   │   ├── main.js           # Dashboard functionality
│   │   ├── inventory.js      # Inventory management
│   │   ├── sales.js          # Sales management
│   │   ├── customers.js      # Customer management
│   │   └── reports.js        # Reports and analytics
│   │
│   └── images/
│       └── logo.png          # Royal Oak Pharmacy logo
│
├── pages/
│   ├── inventory.html        # Inventory management page
│   ├── sales.html            # Sales management page
│   ├── customers.html        # Customer management page
│   └── reports.html          # Reports page
│
└── docs/
    └── (future documentation)
```

## How to Use

### Getting Started
1. Open `index.html` in a web browser
2. The system will automatically initialize with sample data on first load
3. Navigate through different sections using the navigation menu

### Managing Inventory
1. Go to "Inventory" page
2. Click "Add New Medicine" button
3. Fill in medicine details (name, category, quantity, price, expiry date)
4. Click "Add Medicine" to save
5. Use search bar or category filter to find specific medicines
6. Edit quantities or delete medicines as needed

### Recording Sales
1. Go to "Sales" page
2. Click "New Sale" button
3. Enter customer name
4. Select medicine from dropdown (shows available stock)
5. Enter quantity
6. Click "Complete Sale"
7. Stock will automatically be reduced

### Managing Customers
1. Go to "Customers" page
2. Click "Add New Customer" button
3. Fill in customer details (name, email, phone, address)
4. Click "Add Customer" to save
5. Use search to find specific customers

### Generating Reports
1. Go to "Reports" page
2. View default statistics at the top
3. Select report type (Inventory, Sales, or Expiry)
4. For sales reports, optionally select date range
5. Click "Generate Report" to view detailed report

## Data Storage

The application uses browser's LocalStorage to store data. This means:
- Data persists even after closing the browser
- Data is stored locally on your computer
- No internet connection required
- Data is specific to the browser and computer being used

### Sample Data

The system includes sample data on first load:
- **Medicines**: Paracetamol, Amoxicillin, Vitamin C
- **Customers**: John Smith, Sarah Johnson

## Future Enhancements

Potential improvements for future versions:
- User authentication and login system
- Backend database integration
- Prescription management
- Supplier management
- Advanced analytics and charts
- Print receipts functionality
- Export reports to PDF/Excel
- Barcode scanning support

## Browser Compatibility

This application works best on modern browsers:
- Google Chrome (recommended)
- Mozilla Firefox
- Microsoft Edge
- Safari

## Author

Developed as a pharmacy management solution project.

## License

This project is for educational and management purposes.

---

**Royal Oak Pharmacy Management System** - Making pharmacy management simple and efficient.
