import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <nav className="about-nav">
                <div className="nav-brand">
                    <Link to="/">Llador Store TZ</Link>
                </div>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/store" className="nav-link">Store</Link>
                    <Link to="/about" className="nav-link active">About</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
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
                <h1>About Llador Store TZ</h1>
                <p>Your Premier Destination for Luxury Perfumes</p>
            </div>

            <section className="about-content">
                <div className="about-section">
                    <h2>Our Story</h2>
                    <p>
                        Founded with a passion for luxury fragrances, Llador Store TZ has become
                        Tanzania's leading destination for premium perfumes. We curate the finest
                        collections from around the world, bringing you an exquisite selection of
                        scents that define elegance and sophistication.
                    </p>
                </div>

                <div className="ceo-section">
                    <div className="ceo-image-container">
                        <img 
                            <img src="images/winy.jpg" 
                            alt="CEO of Llador Store TZ" 
                            className="ceo-image" 
                        />
                        <div className="ceo-overlay">
                            <h3>John Doe</h3>
                            <p>Founder & CEO</p>
                        </div>
                    </div>
                    <div className="ceo-message">
                        <h2>Message from our CEO</h2>
                        <blockquote>
                            "Our mission is to bring the world's finest fragrances to Tanzania,
                            making luxury accessible while maintaining the highest standards of
                            quality and authenticity."
                        </blockquote>
                    </div>
                </div>

                <div className="values-section">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <i className="fas fa-gem"></i>
                            <h3>Quality</h3>
                            <p>We source only authentic, premium fragrances.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-heart"></i>
                            <h3>Passion</h3>
                            <p>Our love for perfumes drives everything we do.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-star"></i>
                            <h3>Excellence</h3>
                            <p>We strive for excellence in every aspect.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-handshake"></i>
                            <h3>Trust</h3>
                            <p>Building lasting relationships with our customers.</p>
                        </div>
                    </div>
                </div>

                <div className="contact-section">
                    <h2>Connect With Us</h2>
                    <div className="social-links">
                        <a href="https://www.facebook.com/lladorstore" target="_blank" rel="noopener noreferrer" className="social-link facebook">
                            <i className="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                        </a>
                        <a href="https://www.instagram.com/llador_store_tz" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                            <i className="fab fa-instagram"></i>
                            <span>Instagram</span>
                        </a>
                        <a href="https://www.twitter.com/lladorstore" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                            <i className="fab fa-twitter"></i>
                            <span>Twitter</span>
                        </a>
                        <a href="https://wa.me/255746718133" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
                            <i className="fab fa-whatsapp"></i>
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 