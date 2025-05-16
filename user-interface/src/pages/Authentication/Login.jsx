import { useState } from 'react';
import { Leaf, Warehouse, User, Key, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ username, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Header with logo and title */}
        <div className="login-header">
          <h1 className="shop-title">वैष्णवी कृषी केंद्र</h1>
          <p className="shop-subtitle">FERTILIZERS | PESTICIDES | SEEDS</p>
        </div>

        {/* Login Card */}
        <div className="login-card">
          <div className="card-content">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label" style={{textAlign:'start'}}>
                  Username
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <User className="icon" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label" style={{textAlign:'start'}}>
                  Password
                </label>
                <div className="input-wrapper">
                  <div className="input-icon">
                    <Key className="icon" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="form-options">
                <div className="forgot-password">
                  <a href="#" className="forgot-link">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="form-submit">
                <button
                  type="submit"
                  className="login-button"
                  onClick={()=>navigate('/Home')}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="card-footer">
            <p className="footer-text">
              © {new Date().getFullYear()} Vaishnavi Krushi Kendra. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;