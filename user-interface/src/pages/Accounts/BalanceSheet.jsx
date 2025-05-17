import { useState, useEffect } from 'react';
import { Home, ChevronRight, Clock, Plus, Minus, Printer } from 'lucide-react';
import './Styling/BalanceSheet.css';

const BalanceSheet = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [account, setAccount] = useState({
    id: 1,
    name: 'Ramesh Patel',
    phone: '9876543210',
    addedOn: '2023-05-15',
    startingBalance: 5000.00
  });

  const [transactions, setTransactions] = useState([
    { id: 1, date: '2023-06-01', particulars: 'Fertilizer Purchase', drAmount: 0, crAmount: 1250.50 },
    { id: 2, date: '2023-06-05', particulars: 'Payment Received', drAmount: 2000.00, crAmount: 0 },
    { id: 3, date: '2023-06-10', particulars: 'Pesticides Purchase', drAmount: 0, crAmount: 850.75 },
    { id: 4, date: '2023-06-15', particulars: 'Seed Purchase', drAmount: 0, crAmount: 1200.00 },
    { id: 5, date: '2023-06-20', particulars: 'Payment Received', drAmount: 3000.00, crAmount: 0 },
  ]);

  // Calculate current balance
  const calculateBalance = () => {
    let balance = account.startingBalance;
    transactions.forEach(txn => {
      balance += txn.drAmount - txn.crAmount;
    });
    return balance;
  };

  const [balance, setBalance] = useState(calculateBalance());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recalculate balance when transactions change
  useEffect(() => {
    setBalance(calculateBalance());
  }, [transactions]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="balance-sheet-container">
      {/* Header with breadcrumbs and time */}
      <header className="report-header">
        <div className="breadcrumbs">
          <a href="/Home" className="breadcrumb-link">
            <Home size={16} />
            <span>Home</span>
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <a href="/Account" className="breadcrumb-link">
            Accounts
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Balance Sheet</span>
        </div>
        
        <div className="header-actions">
          <div className="header-time">
            <Clock size={16} />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <button className="print-btn" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print</span>
          </button>
        </div>
      </header>

      {/* Account Summary */}
      <div className="account-summary">
        <h1>Account of: {account.name}</h1>
        
        <div className="summary-details">
          <div className="detail-item">
            <span className="detail-label">Added On:</span>
            <span className="detail-value">{formatDate(account.addedOn)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Starting Balance:</span>
            <span className="detail-value">₹{account.startingBalance.toFixed(2)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Current Balance:</span>
            <span className={`detail-value ${balance >= 0 ? 'positive' : 'negative'}`}>
              ₹{balance.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="action-buttons">
          <button className="credit-btn">
            <Plus size={16} />
            <span>Credit</span>
          </button>
          <button className="debit-btn">
            <Minus size={16} />
            <span>Debit</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Particulars</th>
              <th>Dr. Amount (₹)</th>
              <th>Cr. Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.id}>
                <td>{formatDate(txn.date)}</td>
                <td>{txn.particulars}</td>
                <td className={txn.drAmount > 0 ? 'debit' : ''}>
                  {txn.drAmount > 0 ? txn.drAmount.toFixed(2) : '-'}
                </td>
                <td className={txn.crAmount > 0 ? 'credit' : ''}>
                  {txn.crAmount > 0 ? txn.crAmount.toFixed(2) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Balance Summary */}
      <div className="balance-summary">
        <div className="balance-row">
          <span className="balance-label">Total Debit:</span>
          <span className="balance-value debit">
            ₹{transactions.reduce((sum, txn) => sum + txn.drAmount, 0).toFixed(2)}
          </span>
        </div>
        <div className="balance-row">
          <span className="balance-label">Total Credit:</span>
          <span className="balance-value credit">
            ₹{transactions.reduce((sum, txn) => sum + txn.crAmount, 0).toFixed(2)}
          </span>
        </div>
        <div className="balance-row">
          <span className="balance-label">Current Balance:</span>
          <span className={`balance-value ${balance >= 0 ? 'positive' : 'negative'}`}>
            ₹{balance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <footer className="report-footer">
        <div className="footer-signature">
          <div className="signature-line"></div>
          <span>Authorized Signature</span>
        </div>
        <div className="footer-note">
          <span>Vaishnavi Krushi Kendra - Account Balance Sheet</span>
          <span>Generated on: {currentTime.toLocaleDateString()}</span>
        </div>
      </footer>
    </div>
  );
};

export default BalanceSheet;