import { useState, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config';
import './Common.css';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await api.get(API_ENDPOINTS.MEDICINES);
      if (response.success) {
        setMedicines(response.data);
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
      <h1>Medicine Inventory</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td>{medicine.name}</td>
                <td>{medicine.category}</td>
                <td>{medicine.quantity}</td>
                <td>${medicine.sellingPrice}</td>
                <td>{new Date(medicine.expiryDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${medicine.stockStatus}`}>
                    {medicine.stockStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medicines;
