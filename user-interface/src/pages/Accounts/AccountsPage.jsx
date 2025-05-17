import { useState, useEffect } from 'react';
import { Home, ChevronRight, Clock, Search, User, Plus } from 'lucide-react';
import './Styling/AccountsPage.css';
import AddAccount from './AddAccount';
import AddMoney from './AddMoney';
import { useNavigate } from 'react-router-dom';

const AccountsPage = () => {
  const [isAddAccOpen,setIsAddAccOpen] = useState(false);
  const [isAddMoneyOpen,setIsAddMoneyOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'Ramesh Patel', phone: '9876543210', balance: 1250.50 },
    { id: 2, name: 'Suresh Kumar', phone: '8765432109', balance: 3200.00 },
    { id: 3, name: 'Mahesh Yadav', phone: '7654321098', balance: 850.75 },
    { id: 4, name: 'Deepak Sharma', phone: '6543210987', balance: 4200.25 },
    { id: 5, name: 'Rajesh Singh', phone: '5432109876', balance: 1500.00 },
  ]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter accounts based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredAccounts(accounts);
    } else {
      const results = accounts.filter(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.phone.includes(searchTerm)
      );
      setFilteredAccounts(results);
    }
  }, [searchTerm, accounts]);

  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString([], {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddMoney = (accountId) => {
    
  };

  return (
    <div className="accounts-container">
      {/* Header with breadcrumbs and time */}
      <header className="accounts-header">
        <div className="breadcrumbs">
          <a href="/Home" className="breadcrumb-link">
            <Home size={16} />
            <span>Home</span>
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Accounts</span>
        </div>

        <div className="header-time">
          <Clock size={16} />
          <span>{formatTime()} • {formatDate()}</span>
        </div>
      </header>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          className="add-money-btn"
          onClick={()=>setIsAddAccOpen(true)}
        >
          <Plus size={16} />
          <span>Add Account</span>
        </button>
      </div>

      {/* Accounts Table */}
      <div className="accounts-table-container">
        <table className="accounts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Balance (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map(account => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>
                    {account.name}
                  </td>
                  <td>{account.phone}</td>
                  <td className={account.balance < 0 ? 'negative-balance' : ''}>
                    {account.balance.toFixed(2)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button
                        className="add-money-btn"
                        onClick={() => setIsAddMoneyOpen(true)}
                      >
                        <Plus size={16} />
                        <span>Add Money</span>
                      </button>
                      <button
                        className="add-money-btn"
                        onClick={() => navigate('/BalanceSheet')}
                      >
                        <span>Balance Sheet</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-results">
                <td colSpan="5">
                  No accounts found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddAccount
      isOpen={isAddAccOpen}
      onClose={()=>setIsAddAccOpen(false)}
      >
      </AddAccount>
      <AddMoney
      isOpen={isAddMoneyOpen}
      onClose={()=>setIsAddMoneyOpen(false)}
      ></AddMoney>
    </div>
  );
};

export default AccountsPage;