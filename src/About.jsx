import React from 'react';
import './About.css';

const About = () => {
    const socialLinks = {
        facebook: 'https://facebook.com/lladorstore',
        twitter: 'https://twitter.com/lladorstore',
        instagram: 'https://instagram.com/lladorstore',
        whatsapp: 'https://wa.me/255746718133'
    };

    return (
        <div className="about-container">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>Our Story</h1>
                    <p>Discover the journey of Llador Store TZ</p>
                    <div className="hero-social-links">
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-icon">
                            <i className="fab fa-whatsapp"></i>
                        </a>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="about-section">
                <div className="about-content">
                    <h2>Our Story</h2>
                    <p>Founded in 2024, Llador Store TZ emerged from a passion for luxury fragrances and exceptional customer service. Our journey began with a simple idea: to provide the finest perfumes to our customers while ensuring an unforgettable shopping experience.</p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-section mission-section">
                <div className="about-content">
                    <h2>Our Mission</h2>
                    <p>To provide our customers with the highest quality fragrances while delivering exceptional service and creating memorable shopping experiences.</p>
                </div>
            </section>

            {/* Values Section */}
            <section className="about-section values-section">
                <h2>Our Core Values</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">✨</div>
                        <h3>Quality</h3>
                        <p>We never compromise on the quality of our products</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">👥</div>
                        <h3>Customer Service</h3>
                        <p>Your satisfaction is our top priority</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">💡</div>
                        <h3>Innovation</h3>
                        <p>We constantly evolve to meet your needs</p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="about-section team-section">
                <h2>Our Team</h2>
                <div className="team-container">
                    <div className="team-member">
                        <div className="member-image-container">
                            <img 
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                                alt="Team Member" 
                                className="member-image"
                            />
                            <div className="member-overlay">
                                <div className="member-social">
                                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                    <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <i className="fab fa-whatsapp"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="member-info">
                            <h3>John Doe</h3>
                            <p className="member-role">Founder & CEO</p>
                            <p className="member-bio">With over 15 years of experience in the fragrance industry, John leads our team with passion and expertise.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="about-section contact-section">
                <h2>Get in Touch</h2>
                <div className="contact-info">
                    <div className="contact-item">
                        <div className="contact-icon">📍</div>
                        <div className="contact-details">
                            <h3>Address</h3>
                            <p>123 Perfume Street, Dar es Salaam, Tanzania</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-icon">📞</div>
                        <div className="contact-details">
                            <h3>Phone</h3>
                            <p>+255 746 718 133</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <div className="contact-icon">✉️</div>
                        <div className="contact-details">
                            <h3>Email</h3>
                            <p>info@lladorstore.com</p>
                        </div>
                    </div>
                </div>
                <div className="contact-social">
                    <h3>Follow Us</h3>
                    <div className="social-buttons">
                        <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-button">
                            <i className="fab fa-facebook"></i> Facebook
                        </a>
                        <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-button">
                            <i className="fab fa-twitter"></i> Twitter
                        </a>
                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-button">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="social-button whatsapp">
                            <i className="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 