import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/logo192.png" alt="Royal Oak Pharmacy" className="logo-img" />
            <h1>Royal Oak Pharmacy</h1>
          </div>
          <div className="user-section">
            <span className="user-info">
              {user?.fullName} ({user?.role})
            </span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </header>

      <div className="main-container">
        <aside className="sidebar">
          <nav className="nav-menu">
            <Link to="/" className="nav-link">📊 Dashboard</Link>
            <Link to="/medicines" className="nav-link">💊 Medicines</Link>
            <Link to="/sales" className="nav-link">💰 Sales</Link>
            <Link to="/customers" className="nav-link">👥 Customers</Link>
            <Link to="/suppliers" className="nav-link">🏭 Suppliers</Link>
            <Link to="/prescriptions" className="nav-link">📋 Prescriptions</Link>
            <Link to="/purchases" className="nav-link">📦 Purchases</Link>
            <Link to="/reports" className="nav-link">📈 Reports</Link>
            {user?.role === 'admin' && (
              <Link to="/users" className="nav-link">👤 Users</Link>
            )}
          </nav>
        </aside>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
