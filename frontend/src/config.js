// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/auth/me',

  // Medicines
  MEDICINES: '/medicines',
  MEDICINE_STATS: '/medicines/stats/summary',

  // Sales
  SALES: '/sales',
  SALES_STATS: '/sales/stats/summary',

  // Customers
  CUSTOMERS: '/customers',

  // Suppliers
  SUPPLIERS: '/suppliers',

  // Prescriptions
  PRESCRIPTIONS: '/prescriptions',

  // Purchases
  PURCHASES: '/purchases',

  // Users
  USERS: '/users',

  // Reports
  DASHBOARD: '/reports/dashboard',
  SALES_REPORT: '/reports/sales',
  INVENTORY_REPORT: '/reports/inventory',
  TOP_SELLING: '/reports/top-selling'
};

export default API_BASE_URL;
