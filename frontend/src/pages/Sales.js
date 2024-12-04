import { useState, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config';
import './Common.css';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.SALES);
      if (response.success) {
        setSales(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <h1>Sales Management</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td>{sale.invoiceNumber}</td>
                <td>{sale.customerName}</td>
                <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
                <td>${sale.total.toFixed(2)}</td>
                <td><span className="badge">{sale.paymentMethod}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
