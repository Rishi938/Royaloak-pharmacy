import { useState, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMedicines: 0,
    lowStock: 0,
    totalCustomers: 0,
    todaySales: 0,
    todayTransactions: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.DASHBOARD);
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💊</div>
          <div className="stat-info">
            <h3>Total Medicines</h3>
            <p className="stat-value">{stats.totalMedicines}</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>Low Stock Items</h3>
            <p className="stat-value">{stats.lowStock}</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Today's Sales</h3>
            <p className="stat-value">${stats.todaySales.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Transactions Today</h3>
            <p className="stat-value">{stats.todayTransactions}</p>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Total Customers</h3>
            <p className="stat-value">{stats.totalCustomers}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <a href="/sales" className="action-btn">
            <span>💰</span>
            <span>New Sale</span>
          </a>
          <a href="/medicines" className="action-btn">
            <span>💊</span>
            <span>Add Medicine</span>
          </a>
          <a href="/customers" className="action-btn">
            <span>👥</span>
            <span>Add Customer</span>
          </a>
          <a href="/reports" className="action-btn">
            <span>📈</span>
            <span>View Reports</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
