import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Authorization/Auth';
import '../css/Navbar.css';

// Get user data from localStorage
const getUserData = () => {
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Get current user data
  const userData = getUserData();
  const isCitraverseAdmin = userData?.role === 'CitraverseAdmin';
  const isPersonalCareManager = userData?.role === 'PersonalCareManager';
  const isAdultKid = userData?.role === 'AdultKid';

  const handleLogout = () => {
    logout(); // This will clear token and redirect to login
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !toggleRef.current.contains(e.target)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Brand - always visible */}
      <div className="navbar-brand">
        <h2>CITRUS HEALTH</h2>
      </div>

      {/* Mobile Header with toggle */}
      <div className="navbar-header">
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          ref={toggleRef}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="navbar-nav desktop-menu">
        <li className="nav-item">
          <button className="nav-link" onClick={() => navigate('/home')}>
            Home
          </button>
        </li>
        {isCitraverseAdmin && (
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/customer-form')}>
              Patient Form
            </button>
          </li>)}
        {(isAdultKid || isPersonalCareManager) && (
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/customer-dashboard')}>
              Dashboard
            </button>
          </li>
        )}
        {(isCitraverseAdmin || isPersonalCareManager) && (
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/customer-report')}>
              Vitals Report
            </button>
          </li>
        )}
        {isCitraverseAdmin && (
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/admin-registration')}>
              Register User
            </button>
          </li>
        )}

        {isCitraverseAdmin && (
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/customer-history')}>
              Patient History
            </button>
          </li>
        )}
        <li className="nav-item">
          <button className="nav-link logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>

      {/* Backdrop */}
      {isMenuOpen && <div className="backdrop" />}

      {/* Mobile Drawer Menu */}
      <div
        className={`navbar-menu-mobile ${isMenuOpen ? 'open' : ''}`}
        ref={menuRef}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/home')}>
              Home
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/customer-form')}>
              Patient Form
            </button>
          </li>
          {(isAdultKid || isPersonalCareManager) && (
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate('/customer-dashboard')}>
                Dashboard
              </button>
            </li>
          )}

          <li className="nav-item">
            <button className="nav-link" onClick={() => navigate('/customer-report')}>
              Vitals Report
            </button>
          </li>
          {isCitraverseAdmin && (
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate('/admin-registration')}>
                Register User
              </button>
            </li>
          )}
          {isCitraverseAdmin && (
            <li className="nav-item">
              <button className="nav-link" onClick={() => navigate('/customer-history')}>
                Patient History
              </button>
            </li>
          )}
          <li className="nav-item">
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
