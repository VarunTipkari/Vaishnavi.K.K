import { useState, useEffect } from 'react';
import { Home, ChevronRight, Clock, Warehouse, Leaf, Bug } from 'lucide-react';
import './StockManagementLanding.css';
import { useNavigate } from 'react-router-dom';

const StockManagementLanding = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const navigateTo = (category) => {
    navigate(category);
  };

  return (
    <div className="stock-landing-container">
      {/* Header with breadcrumbs and time */}
      <header className="stock-header">
        <div className="breadcrumbs">
          <a href="/Home" className="breadcrumb-link">
            <Home size={16} />
            <span>Home</span>
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Stock Management</span>
        </div>
        
        <div className="header-time">
          <Clock size={16} />
          <span>{formatTime()} • {formatDate()}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="stock-landing-main">
        <div className="page-title">
          <Warehouse size={32} className="title-icon" />
          <h1>Stock Management</h1>
        </div>

        <div className="category-grid">
          {/* Fertilizers Card */}
          <div className="category-card" onClick={() => navigateTo('/Fertilizers')}>
            <div className="card-icon fertilizer">
              <Leaf size={40} />
            </div>
            <h2>Fertilizers</h2>
            <p>Manage all fertilizer stocks</p>
          </div>

          {/* Pesticides Card */}
          <div className="category-card" onClick={() => navigateTo('Pesticides')}>
            <div className="card-icon pesticide">
              <Bug size={40} />
            </div>
            <h2>Pesticides</h2>
            <p>Manage pesticide inventory</p>
          </div>

          {/* Seeds Card */}
          <div className="category-card" onClick={() => navigateTo('Seeds')}>
            <div className="card-icon seed">
              <Leaf size={40} />
            </div>
            <h2>Seeds</h2>
            <p>Track seed varieties</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StockManagementLanding;