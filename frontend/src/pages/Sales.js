import { useState, useEffect } from 'react';
import api from '../services/api';
import { API_ENDPOINTS } from '../config';
import './Sales.css';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewSale, setShowNewSale] = useState(false);

  const [saleForm, setSaleForm] = useState({
    customerName: '',
    paymentMethod: 'cash',
    items: []
  });

  const [currentItem, setCurrentItem] = useState({
    medicine: '',
    quantity: 1
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [salesRes, medicinesRes, customersRes] = await Promise.all([
        api.get(API_ENDPOINTS.SALES),
        api.get(API_ENDPOINTS.MEDICINES),
        api.get(API_ENDPOINTS.CUSTOMERS)
      ]);

      if (salesRes.success) setSales(salesRes.data);
      if (medicinesRes.success) setMedicines(medicinesRes.data.filter(m => m.quantity > 0));
      if (customersRes.success) setCustomers(customersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = () => {
    if (!currentItem.medicine || currentItem.quantity < 1) {
      alert('Please select a medicine and quantity');
      return;
    }

    const medicine = medicines.find(m => m._id === currentItem.medicine);
    if (!medicine) return;

    if (currentItem.quantity > medicine.quantity) {
      alert(`Only ${medicine.quantity} available in stock!`);
      return;
    }

    setSaleForm({
      ...saleForm,
      items: [...saleForm.items, {
        medicine: currentItem.medicine,
        medicineName: medicine.name,
        quantity: currentItem.quantity,
        price: medicine.sellingPrice
      }]
    });

    setCurrentItem({ medicine: '', quantity: 1 });
  };

  const removeItemFromCart = (index) => {
    const newItems = saleForm.items.filter((_, i) => i !== index);
    setSaleForm({ ...saleForm, items: newItems });
  };

  const calculateTotal = () => {
    return saleForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleSubmitSale = async (e) => {
    e.preventDefault();

    if (saleForm.items.length === 0) {
      alert('Please add at least one item to the cart');
      return;
    }

    try {
      const response = await api.post(API_ENDPOINTS.SALES, {
        ...saleForm,
        items: saleForm.items.map(item => ({
          medicine: item.medicine,
          quantity: item.quantity
        }))
      });

      if (response.success) {
        alert(`Sale completed! Invoice: ${response.data.invoiceNumber}`);
        setShowNewSale(false);
        setSaleForm({ customerName: '', paymentMethod: 'cash', items: [] });
        fetchData();
      }
    } catch (err) {
      alert(err.message || 'Failed to create sale');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="sales-page">
      <div className="page-header">
        <h1>💰 Sales Management</h1>
        <button className="btn-primary" onClick={() => setShowNewSale(!showNewSale)}>
          {showNewSale ? '✕ Cancel' : '+ New Sale'}
        </button>
      </div>

      {showNewSale && (
        <div className="new-sale-container">
          <div className="sale-form-card">
            <h2>Create New Sale</h2>
            <form onSubmit={handleSubmitSale}>
              <div className="form-row">
                <div className="form-group">
                  <label>Customer Name *</label>
                  <input
                    type="text"
                    value={saleForm.customerName}
                    onChange={(e) => setSaleForm({...saleForm, customerName: e.target.value})}
                    required
                    placeholder="Enter customer name"
                    list="customer-list"
                  />
                  <datalist id="customer-list">
                    {customers.map(c => (
                      <option key={c._id} value={c.name} />
                    ))}
                  </datalist>
                </div>

                <div className="form-group">
                  <label>Payment Method</label>
                  <select
                    value={saleForm.paymentMethod}
                    onChange={(e) => setSaleForm({...saleForm, paymentMethod: e.target.value})}
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>
              </div>

              <div className="add-item-section">
                <h3>Add Items</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Select Medicine</label>
                    <select
                      value={currentItem.medicine}
                      onChange={(e) => setCurrentItem({...currentItem, medicine: e.target.value})}
                    >
                      <option value="">-- Select Medicine --</option>
                      {medicines.map(m => (
                        <option key={m._id} value={m._id}>
                          {m.name} - ${m.sellingPrice} (Stock: {m.quantity})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={currentItem.quantity}
                      onChange={(e) => setCurrentItem({...currentItem, quantity: parseInt(e.target.value)})}
                      min="1"
                    />
                  </div>

                  <div className="form-group">
                    <label>&nbsp;</label>
                    <button type="button" className="btn-secondary" onClick={addItemToCart}>
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-section">
                <h3>Cart ({saleForm.items.length} items)</h3>
                {saleForm.items.length === 0 ? (
                  <p className="empty-cart">Cart is empty. Add items above.</p>
                ) : (
                  <table className="cart-table">
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saleForm.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.medicineName}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button
                              type="button"
                              className="btn-remove"
                              onClick={() => removeItemFromCart(index)}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3"><strong>Total</strong></td>
                        <td colSpan="2"><strong>${calculateTotal().toFixed(2)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={saleForm.items.length === 0}>
                  Complete Sale
                </button>
                <button type="button" className="btn-secondary" onClick={() => setShowNewSale(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="sales-list">
        <h2>Recent Sales</h2>
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '2rem'}}>
                    No sales yet. Create your first sale!
                  </td>
                </tr>
              ) : (
                sales.map(sale => (
                  <tr key={sale._id}>
                    <td><strong>{sale.invoiceNumber}</strong></td>
                    <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
                    <td>{sale.customerName}</td>
                    <td>{sale.items.length} item(s)</td>
                    <td><strong>${sale.total.toFixed(2)}</strong></td>
                    <td><span className="payment-badge">{sale.paymentMethod}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Sales;
