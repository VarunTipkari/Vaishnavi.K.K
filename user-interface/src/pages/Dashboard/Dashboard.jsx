import { useState, useEffect } from 'react';
import { User, LogOut, Clock, ShoppingCart, Warehouse, BookOpen, PieChart, Settings, AlertCircle } from 'lucide-react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const username = "Sandip Tipkari";

  const navigate = useNavigate();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1 className="shop-title" style={{textAlign:'start'}}>वैष्णवी कृषी केंद्र ,चांडोल</h1>
          <div className="header-time">
            <Clock size={16} />
            <span>{formatTime()} • {formatDate()}</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="user-profile">
            <div className="user-badge">
              <User size={18} />
              <span className="username">{username}</span>
            </div>
            <button className="logout-btn" onClick={() => navigate('/')}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-grid">
          {/* Billing Card */}
          <div className="nav-card" onClick={() => console.log('Navigate to Billing')}>
            <div className="card-icon" style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)' }}>
              <ShoppingCart size={32} color="#4ade80" />
            </div>
            <h3>Billing</h3>
            <p>Create invoices & manage sales</p>
          </div>

          {/* Stock Management Card */}
          <div className="nav-card" onClick={() => navigate('/Stock')}>
            <div className="card-icon" style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)' }}>
              <Warehouse size={32} color="#eab308" />
            </div>
            <h3>Stock Management</h3>
            <p>View & update inventory</p>
          </div>

          {/* Accounts Card */}
          <div className="nav-card" onClick={() => navigate('/Account')}>
            <div className="card-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <BookOpen size={32} color="#3b82f6" />
            </div>
            <h3>Accounts</h3>
            <p>Financial records & reports</p>
          </div>

          {/* Reports Card */}
          <div className="nav-card" onClick={() => console.log('Navigate to Reports')}>
            <div className="card-icon" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)' }}>
              <PieChart size={32} color="#a855f7" />
            </div>
            <h3>Reports</h3>
            <p>Analytics & insights</p>
          </div>

          {/* Settings Card */}
          <div className="nav-card" onClick={() => console.log('Navigate to Settings')}>
            <div className="card-icon" style={{ backgroundColor: 'rgba(100, 116, 139, 0.1)' }}>
              <Settings size={32} color="#64748b" />
            </div>
            <h3>Settings</h3>
            <p>Configure your shop</p>
          </div>

          {/* Alerts Card */}
          <div className="nav-card" onClick={() => console.log('Navigate to Alerts')}>
            <div className="card-icon" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <AlertCircle size={32} color="#ef4444" />
            </div>
            <h3>Alerts</h3>
            <p>Low stock & notifications</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;