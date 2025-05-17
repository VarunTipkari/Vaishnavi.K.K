import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Truck, RefreshCw, Check , ArrowLeft} from 'lucide-react';
import { Home, ChevronRight, Clock, Plus, Warehouse } from 'lucide-react';
import './Styling/UpdateStock.css';

const UpdateStock = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Sample fertilizer data (replace with your database fetch)
  const [fertilizers, setFertilizers] = useState([
    { id: 1, name: 'Urea' },
    { id: 2, name: 'DAP (18:46:0)' },
    { id: 3, name: '20:20:0:13' },
    { id: 4, name: 'MOP (Muriate of Potash)' },
    { id: 5, name: '10:26:26' },
    { id: 6, name: 'Ammonium Sulphate' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFertilizer, setSelectedFertilizer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState(0);

  // Search functionality
  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = fertilizers.filter(fertilizer =>
        fertilizer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, fertilizers]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSelectedFertilizer(null);
  };

  const selectFertilizer = (fertilizer) => {
    setSelectedFertilizer(fertilizer);
    setSearchTerm(fertilizer.name);
    setSearchResults([]);
  };

  // Fetch deliveries for selected fertilizer and date
  const fetchDeliveries = () => {
    if (!selectedFertilizer) return;
    
    // Simulate API call - replace with your actual data fetch
    const mockDeliveries = [
      { id: 1, date: '2023-06-01', delivered: 5 },
      { id: 2, date: '2023-06-05', delivered: 10 },
    ];
    
    setDeliveries(mockDeliveries.filter(d => d.date === selectedDate));
  };

  // Update stock
  const handleUpdateStock = () => {
    if (!selectedFertilizer || newDelivery <= 0) return;
    
    // Here you would typically send the update to your backend
    console.log(`Updating ${selectedFertilizer.name} with ${newDelivery} bags on ${selectedDate}`);
    
    // Simulate successful update
    setDeliveries([...deliveries, { 
      id: Date.now(), 
      date: selectedDate, 
      delivered: newDelivery 
    }]);
    setNewDelivery(0);
  };

  return (
    <div className='main-container'>
        <div className='header'>
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
          <a href='#' onClick={() => navigate('/Fertilizers')} className="breadcrumb-link">
            <span>Fertilizers</span>
          </a>
          <ChevronRight size={16} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Update</span>
        </div>
        
        <div className="header-time">
          <Clock size={16} />
          <span>{formatTime()} • {formatDate()}</span>
        </div>
      </header>

      <h1 className="page-title">
        <RefreshCw size={24} className="title-icon" />
        Update Stock
      </h1>

      </div>

      {/* Search and Date Selection */}
      <div className='update-stock-container'>
      <div className="search-section">
        <div className="search-box">
          <div className="search-input">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search fertilizer..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map(fertilizer => (
                <li 
                  key={fertilizer.id} 
                  onClick={() => selectFertilizer(fertilizer)}
                >
                  {fertilizer.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="date-selection">
          <Calendar size={18} className="calendar-icon" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <button 
          className="fetch-btn"
          onClick={fetchDeliveries}
          disabled={!selectedFertilizer}
        >
          <Truck size={18} />
          <span>Get Deliveries</span>
        </button>
      </div>

      {/* Deliveries List */}
      {deliveries.length > 0 && (
        <div className="deliveries-section">
          <h3>
            <Truck size={18} />
            <span>Deliveries on {new Date(selectedDate).toLocaleDateString()}</span>
          </h3>
          
          <ul className="deliveries-list">
            {deliveries.map(delivery => (
              <li key={delivery.id}>
                <span className="delivery-date">
                  {new Date(delivery.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </span>
                <span className="delivery-quantity">
                  {delivery.delivered} bags
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Update Form */}
      <div className="update-form">
        <h3>
          <Check size={18} />
          <span>Update Stock</span>
        </h3>
        
        <div className="form-group">
          <label>Bags Delivered Today:</label>
          <input
            type="number"
            min="0"
            value={newDelivery}
            onChange={(e) => setNewDelivery(parseInt(e.target.value) || 0)}
            placeholder="Enter number of bags"
          />
        </div>
        
        <button
          className="update-btn"
          onClick={handleUpdateStock}
          disabled={newDelivery <= 0}
        >
          Update Stock
        </button>
      </div>
      </div>
    </div>
  );
};

export default UpdateStock;