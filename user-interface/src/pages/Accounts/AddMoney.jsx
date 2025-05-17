import { useState } from 'react';
import { X, Calendar, Package, IndianRupee } from 'lucide-react';
import './Styling/AddMoney.css';

const AddMoney = ({ isOpen, onClose}) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    particulars: 'Fertilizer',
    amount: ''
  });

  const particularsOptions = [
    'Fertilizer',
    'Pesticides',
    'Seeds',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    // Prepare transaction data
    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date).toISOString()
    };
    
    onAddTransaction(transactionData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add Money Transaction</h2>
          <button className="close-btn" onClick={()=>{
            setFormData(
                new Date().toISOString().split('T')[0],
                'Fertilizer',
                ''
            );
            onClose();
          }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="date">
              <Calendar size={16} />
              <span>Date*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="particulars">
              <Package size={16} />
              <span>Particulars*</span>
            </label>
            <select
              id="particulars"
              name="particulars"
              value={formData.particulars}
              onChange={handleInputChange}
              required
            >
              {particularsOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">
              <IndianRupee size={16} />
              <span>Amount (₹)*</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={()=>{
                  setFormData(
                new Date().toISOString().split('T')[0],
                'Fertilizer',
                ''
                );
                onClose();
            }}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoney;