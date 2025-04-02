import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import '../styles/Navigation.css';

const Navigation = ({ activePage }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const loadCartCount = () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartCount(cart.length);
        };

        window.addEventListener('scroll', handleScroll);
        loadCartCount();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/store', label: 'Store' },
        { path: '/about', label: 'About' },
        { path: '/contact', label: 'Contact' },
        { path: '/admin', label: 'Admin' }
    ];

    return (
        <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    Llador
                </Link>

                <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    <Link to="/cart" className="cart-icon" onClick={closeMobileMenu}>
                        <FaShoppingCart />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                    <Link to="/admin" className="admin-icon" onClick={closeMobileMenu}>
                        <FaUser />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 