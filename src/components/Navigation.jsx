import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ activePage }) => {
    return (
        <nav className="nav">
            <Link to="/" className="nav-brand">
                <i className="fas fa-spray-can"></i>
                <span>Llador Store TZ</span>
            </Link>
            <div className="nav-links">
                <Link to="/" className={`nav-link ${activePage === 'home' ? 'active' : ''}`}>
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </Link>
                <Link to="/store" className={`nav-link ${activePage === 'store' ? 'active' : ''}`}>
                    <i className="fas fa-store"></i>
                    <span>Store</span>
                </Link>
                <Link to="/about" className={`nav-link ${activePage === 'about' ? 'active' : ''}`}>
                    <i className="fas fa-info-circle"></i>
                    <span>About</span>
                </Link>
                <Link to="/contact" className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}>
                    <i className="fas fa-envelope"></i>
                    <span>Contact</span>
                </Link>
            </div>
            <div className="nav-actions">
                <Link to="/wishlist" className="wishlist-link">
                    <i className="fas fa-heart"></i>
                    <span className="wishlist-count">0</span>
                </Link>
                <Link to="/cart" className="cart-button">
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-count">0</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navigation; 