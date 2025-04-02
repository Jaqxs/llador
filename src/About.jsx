import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <section className="about-hero">
                <div className="about-hero-content">
                    <h1>About Llador Store TZ</h1>
                    <p>Your Destination for Luxury Fragrances</p>
                </div>
            </section>

            <section className="about-content">
                <div className="about-section">
                    <h2>Our Story</h2>
                    <p>
                        Founded in 2024, Llador Store TZ emerged from a passion for bringing the finest fragrances to Tanzania.
                        We believe that everyone deserves to experience the luxury of premium perfumes, and we're committed
                        to making that dream a reality.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        To provide our customers with the most exquisite fragrances while delivering an exceptional
                        shopping experience. We carefully curate our collection to ensure each product meets our high
                        standards of quality and luxury.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <h3>Quality</h3>
                            <p>We never compromise on the quality of our products.</p>
                        </div>
                        <div className="value-card">
                            <h3>Customer Service</h3>
                            <p>Your satisfaction is our top priority.</p>
                        </div>
                        <div className="value-card">
                            <h3>Innovation</h3>
                            <p>We constantly explore new fragrances and trends.</p>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2>Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Team Member 1" />
                            <h3>Winy </h3>
                            <p>Founder & CEO</p>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2>Contact Us</h2>
                    <div className="contact-info">
                        <div className="contact-item">
                            <h3>Address</h3>
                            <p>123 Luxury Street, Dar es Salaam, Tanzania</p>
                        </div>
                        <div className="contact-item">
                            <h3>Phone</h3>
                            <p>+255746718133</p>
                        </div>
                        <div className="contact-item">
                            <h3>Email</h3>
                            <p>info@lladorstoretz.com</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 