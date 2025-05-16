import { useState, useEffect } from 'react';
import { Home, ChevronRight, Clock, Plus, Warehouse } from 'lucide-react';
import './FertStock.css';
import { useNavigate } from 'react-router-dom';

const FertilizersStock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stocks, setStocks] = useState([
    { id: 1, name: 'Urea', bags: 42, manufacturer: "Rama Krushi Rasayan", addedDate: '2023-05-15' },
    { id: 2, name: 'DAP', bags: 28, manufacturer: "Rama", addedDate: '2023-05-10' },
    { id: 3, name: '20:20:0:13', bags: 15, manufacturer: "Sardar", addedDate: '2023-05-18' },
    { id: 4, name: 'MOP', bags: 36, manufacturer: "Krishi", addedDate: '2023-05-05' },
    { id: 5, name: '10:26:26', bags: 22, manufacturer: "Sardar", addedDate: '2023-05-12' },
    { id: 6, name: 'Ammonium Sulphate', bags: 18, manufacturer: "Krishi", addedDate: '2023-05-20' },
  ]);

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

  const formatStockDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleAddStock = () => {
    console.log('Add new stock');
  };

  const handleCardClick = (id) => {
    console.log('Navigate to stock details:', id);
    // Replace with your navigation logic
    // navigate(`/stock/${id}`);
  };

  return (
    <div className="stock-management-container">
      {/* Header with breadcrumbs and time */}
      <header className="stock-header">
        <div className="breadcrumbs">
          <a href='#' onClick={() => navigate('/Home')} className="breadcrumb-link">
            <Home size={16} />
            <span>Home</span>
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <a href='#' onClick={() => navigate('/Stock')} className="breadcrumb-link">
            <span>Stock Management</span>
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Fertilizers</span>
        </div>
        
        <div className="header-time">
          <Clock size={16} />
          <span>{formatTime()} • {formatDate()}</span>
        </div>
      </header>

      {/* Page title and add button */}
      <div className="page-title-bar">
        <h1 className="page-title">
          <Warehouse size={24} className="title-icon" />
          Fertilizer Stock
        </h1>
        <button className="add-stock-btn" onClick={handleAddStock}>
          <Plus size={18} />
          <span>Add Stock</span>
        </button>
      </div>

      {/* Stock Cards Grid */}
      <div className="stock-grid">
        {stocks.map((stock) => (
          <div 
            key={stock.id} 
            className="stock-card"
            onClick={() => navigate('/FertReport')}
          >
            <h3 className="stock-name">{stock.name}</h3>
            <h4>{"[ "+stock.manufacturer+" ]"}</h4>
            <div className="stock-quantity">
              <span className="quantity-label">Remaining Bags</span>
              <span className="quantity-value">{stock.bags}</span>
            </div>
            
            <div className="stock-date">
              Added: {formatStockDate(stock.addedDate)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FertilizersStock;