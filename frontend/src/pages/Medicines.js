import { useState, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config';
import Loading from '../components/Loading';
import Notification from '../components/Notification';
import './Medicines.css';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    genericName: '',
    category: 'painkiller',
    manufacturer: '',
    description: '',
    batchNumber: '',
    quantity: '',
    reorderLevel: 10,
    unitPrice: '',
    sellingPrice: '',
    expiryDate: '',
    dosage: '',
    unit: 'tablet',
    prescriptionRequired: false
  });

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
      setNotification({ message: 'Failed to load medicines', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(API_ENDPOINTS.MEDICINES, formData);
      if (response.success) {
        setNotification({ message: 'Medicine added successfully!', type: 'success' });
        setShowForm(false);
        fetchMedicines();
        resetForm();
      }
    } catch (err) {
      setNotification({ message: err.message || 'Failed to add medicine', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await api.delete(`${API_ENDPOINTS.MEDICINES}/${id}`);
        setNotification({ message: 'Medicine deleted successfully!', type: 'success' });
        fetchMedicines();
      } catch (err) {
        setNotification({ message: 'Failed to delete medicine', type: 'error' });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      genericName: '',
      category: 'painkiller',
      manufacturer: '',
      description: '',
      batchNumber: '',
      quantity: '',
      reorderLevel: 10,
      unitPrice: '',
      sellingPrice: '',
      expiryDate: '',
      dosage: '',
      unit: 'tablet',
      prescriptionRequired: false
    });
  };

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || medicine.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loading message="Loading medicines..." />;

  return (
    <div className="medicines-page">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="page-header">
        <h1>💊 Medicine Inventory</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '+ Add New Medicine'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2>Add New Medicine</h2>
          <form onSubmit={handleSubmit} className="medicine-form">
            <div className="form-row">
              <div className="form-group">
                <label>Medicine Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Paracetamol 500mg"
                />
              </div>
              <div className="form-group">
                <label>Generic Name</label>
                <input
                  type="text"
                  name="genericName"
                  value={formData.genericName}
                  onChange={handleInputChange}
                  placeholder="e.g., Acetaminophen"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange} required>
                  <option value="painkiller">Painkiller</option>
                  <option value="antibiotic">Antibiotic</option>
                  <option value="vitamin">Vitamin</option>
                  <option value="antiseptic">Antiseptic</option>
                  <option value="antacid">Antacid</option>
                  <option value="antihistamine">Antihistamine</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Manufacturer *</label>
                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., PharmaCorp"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Batch Number *</label>
                <input
                  type="text"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., BATCH2024001"
                />
              </div>
              <div className="form-group">
                <label>Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  placeholder="e.g., 500mg"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="0"
                  placeholder="e.g., 100"
                />
              </div>
              <div className="form-group">
                <label>Reorder Level</label>
                <input
                  type="number"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Unit Price *</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  placeholder="e.g., 0.50"
                />
              </div>
              <div className="form-group">
                <label>Selling Price *</label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleInputChange}
                  required
                  step="0.01"
                  min="0"
                  placeholder="e.g., 1.00"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date *</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Unit Type</label>
                <select name="unit" value={formData.unit} onChange={handleInputChange}>
                  <option value="tablet">Tablet</option>
                  <option value="capsule">Capsule</option>
                  <option value="syrup">Syrup</option>
                  <option value="injection">Injection</option>
                  <option value="cream">Cream</option>
                  <option value="drops">Drops</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Brief description of the medicine..."
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="prescriptionRequired"
                  checked={formData.prescriptionRequired}
                  onChange={handleInputChange}
                />
                Prescription Required
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">Save Medicine</button>
              <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="filters-section">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="painkiller">Painkiller</option>
          <option value="antibiotic">Antibiotic</option>
          <option value="vitamin">Vitamin</option>
          <option value="antiseptic">Antiseptic</option>
          <option value="antacid">Antacid</option>
          <option value="antihistamine">Antihistamine</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="table-card">
        <table className="medicines-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Category</th>
              <th>Manufacturer</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Selling Price</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicines.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>
                  No medicines found
                </td>
              </tr>
            ) : (
              filteredMedicines.map((medicine) => (
                <tr key={medicine._id}>
                  <td>
                    <strong>{medicine.name}</strong>
                    {medicine.prescriptionRequired && <span className="rx-badge">Rx</span>}
                  </td>
                  <td><span className="category-badge">{medicine.category}</span></td>
                  <td>{medicine.manufacturer}</td>
                  <td>{medicine.quantity}</td>
                  <td>${medicine.unitPrice.toFixed(2)}</td>
                  <td>${medicine.sellingPrice.toFixed(2)}</td>
                  <td>{new Date(medicine.expiryDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status-badge ${medicine.stockStatus}`}>
                      {medicine.stockStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <button className="btn-edit" title="Edit">✏️</button>
                    <button className="btn-delete" onClick={() => handleDelete(medicine._id)} title="Delete">🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="stats-footer">
        <div className="stat-item">
          <span>Total:</span> <strong>{medicines.length}</strong>
        </div>
        <div className="stat-item">
          <span>Showing:</span> <strong>{filteredMedicines.length}</strong>
        </div>
        <div className="stat-item">
          <span>Low Stock:</span> <strong className="warning">{medicines.filter(m => m.stockStatus === 'low_stock').length}</strong>
        </div>
      </div>
    </div>
  );
};

export default Medicines;
