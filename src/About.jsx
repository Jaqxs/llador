import React from 'react';
import { Link } from 'react-router-dom';
import winyImage from './assets/winy.jpg';
import './styles/global.css';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <nav className="nav">
                <Link to="/" className="nav-brand">
                    <i className="fas fa-spray-can"></i>
                    <span>Llador Store TZ</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        <i className="fas fa-home"></i>
                        <span>Home</span>
                    </Link>
                    <Link to="/store" className="nav-link">
                        <i className="fas fa-store"></i>
                        <span>Store</span>
                    </Link>
                    <Link to="/about" className="nav-link active">
                        <i className="fas fa-info-circle"></i>
                        <span>About</span>
                    </Link>
                    <Link to="/contact" className="nav-link">
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

            <div className="about-hero">
                <div className="hero-content">
                    <h1>About Llador Store TZ</h1>
                    <p>Your Premier Destination for Luxury Perfumes</p>
                    <div className="hero-scroll">
                        <span>Scroll Down</span>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>
            </div>

            <section className="about-content">
                <div className="card about-section">
                    <h2>Our Story</h2>
                    <p>
                        Founded with a passion for luxury fragrances, Llador Store TZ has become
                        Tanzania's leading destination for premium perfumes. We curate the finest
                        collections from around the world, bringing you an exquisite selection of
                        scents that define elegance and sophistication.
                    </p>
                </div>

                <div className="ceo-section">
                    <div className="card ceo-image-container">
                        <img 
                            src={winyImage} 
                            alt="CEO of Llador Store TZ" 
                            className="ceo-image" 
                        />
                        <div className="ceo-overlay">
                            <h3>winy</h3>
                            <p>Founder & CEO</p>
                        </div>
                    </div>
                    <div className="card ceo-message">
                        <h2>Message from our CEO</h2>
                        <blockquote>
                            "Our mission is to bring the world's finest fragrances to Tanzania,
                            making luxury accessible while maintaining the highest standards of
                            quality and authenticity."
                        </blockquote>
                    </div>
                </div>

                <div className="values-section">
                    <h2 className="text-center">Our Values</h2>
                    <div className="values-grid">
                        <div className="card value-card">
                            <i className="fas fa-gem"></i>
                            <h3>Quality</h3>
                            <p>We source only authentic, premium fragrances.</p>
                        </div>
                        <div className="card value-card">
                            <i className="fas fa-heart"></i>
                            <h3>Passion</h3>
                            <p>Our love for perfumes drives everything we do.</p>
                        </div>
                        <div className="card value-card">
                            <i className="fas fa-star"></i>
                            <h3>Excellence</h3>
                            <p>We strive for excellence in every aspect.</p>
                        </div>
                        <div className="card value-card">
                            <i className="fas fa-handshake"></i>
                            <h3>Trust</h3>
                            <p>Building lasting relationships with our customers.</p>
                        </div>
                    </div>
                </div>

                <div className="contact-section">
                    <h2 className="text-center">Connect With Us</h2>
                    <div className="social-links">
                        <a
                            href="https://instagram.com/lladorstoretz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-accent social-link"
                        >
                            <span>Instagram</span>
                        </a>
                        <a
                            href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-accent social-link"
                        >
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 