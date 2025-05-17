import { useState } from 'react';
import { X, User, Phone, Wallet } from 'lucide-react';
import './Styling/AddAccount.css';

const AddAccount = ({ isOpen, onClose}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    balance: ''
  });

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
    if (!formData.name || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Convert balance to number
    const accountData = {
      ...formData,
      balance: parseFloat(formData.balance) || 0
    };
    
    onAddAccount(accountData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add New Account</h2>
          <button className="close-btn" onClick={()=>{
            setFormData('','','');
            onClose();
          }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">
              <User size={16} />
              <span>Customer Name*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <Phone size={16} />
              <span>Phone Number*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="balance">
              <Wallet size={16} />
              <span>Starting Balance (₹)</span>
            </label>
            <input
              type="number"
              id="balance"
              name="balance"
              value={formData.balance}
              onChange={handleInputChange}
              placeholder="Enter starting balance"
              step="0.01"
              min="0"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="add-btn">
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccount;