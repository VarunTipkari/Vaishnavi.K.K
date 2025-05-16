import { useState, useEffect } from 'react';
import { Home, ChevronRight, Clock, Printer, Warehouse } from 'lucide-react';
import './FertStockReport.css';

const FertStockReport = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stockData, setStockData] = useState({
    name: 'Urea',
    totalBags: 100,
    balance: 42,
    manufacturer: 'Nagarjuna Fertilizers',
    weightPerBag: '50 kg',
    boughtFrom: 'AgriDistri Pvt. Ltd.',
    addedOn: '2023-05-15'
  });

  const [transactions, setTransactions] = useState([
    { date: '2023-06-01', delivered: 5, remained: 95 },
    { date: '2023-06-05', delivered: 10, remained: 85 },
    { date: '2023-06-10', delivered: 8, remained: 77 },
    { date: '2023-06-15', delivered: 12, remained: 65 },
    { date: '2023-06-20', delivered: 15, remained: 50 },
    { date: '2023-06-25', delivered: 8, remained: 42 },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const totalDelivered = transactions.reduce((sum, item) => sum + item.delivered, 0);
  const totalRemained = stockData.balance;

  return (
    <div className="fertilizer-stock-container">
      {/* Header with breadcrumbs and time */}
      <header className="report-header">
        <div className="breadcrumbs">
          <a href="/" className="breadcrumb-link">
            <Home size={16} />
            <span>Home</span>
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <a href="/stock" className="breadcrumb-link">
            Stock Management
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <a href="/Fertilizers" className="breadcrumb-link">
            Fertilizers
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Fertilizer Stock</span>
        </div>
        
        <div className="header-actions">
          <div className="header-time">
            <Clock size={16} />
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
          <button className="print-btn" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print Report</span>
          </button>
        </div>
      </header>

      {/* Report Title */}
      <div className="report-title">
        <Warehouse size={28} />
        <h1>Fertilizer Stock Report</h1>
        <div className="report-date">
          {currentTime.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stock Summary */}
      <div className="stock-summary">
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Fertilizer:</span>
            <span className="summary-value">{stockData.name}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Bags:</span>
            <span className="summary-value">{stockData.totalBags}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Balance:</span>
            <span className="summary-value highlight">{stockData.balance}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Manufacturer:</span>
            <span className="summary-value">{stockData.manufacturer}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Weight per Bag:</span>
            <span className="summary-value">{stockData.weightPerBag}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Bought From:</span>
            <span className="summary-value">{stockData.boughtFrom}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Added On:</span>
            <span className="summary-value">{formatDate(stockData.addedOn)}</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Bags Delivered</th>
              <th>Remained Stock</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.delivered}</td>
                <td>{transaction.remained}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="total-row">
              <td>Total</td>
              <td>{totalDelivered}</td>
              <td>{totalRemained}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Footer */}
      <footer className="report-footer">
        <div className="footer-signature">
          <div className="signature-line"></div>
          <span>Authorized Signature</span>
        </div>
        <div className="footer-note">
          <span>Vaishnavi Krushi Kendra - Stock Management System</span>
        </div>
      </footer>
    </div>
  );
};

export default FertStockReport;