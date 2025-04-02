import React from 'react';
import Navigation from './components/Navigation';
import './styles/global.css';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <Navigation activePage="contact" />
            
            <div className="contact-header">
                <h1>Get in Touch</h1>
                <p>We'd love to hear from you. Send us a message!</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="card info-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>Visit Us</h3>
                        <p>123 Perfume Street</p>
                        <p>Dar es Salaam, Tanzania</p>
                        <p>Open: Mon - Sat, 9:00 AM - 6:00 PM</p>
                    </div>

                    <div className="card info-card">
                        <i className="fas fa-phone"></i>
                        <h3>Call Us</h3>
                        <p>+255 746 718 133</p>
                        <p>+255 123 456 789</p>
                    </div>

                    <div className="card info-card">
                        <i className="fas fa-envelope"></i>
                        <h3>Email Us</h3>
                        <p>info@lladorstoretz.com</p>
                        <p>support@lladorstoretz.com</p>
                    </div>

                    <div className="card social-card">
                        <h3>Follow Us</h3>
                        <div className="social-links">
                            <a href="https://www.instagram.com/llador_store_tz" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://wa.me/255746718133" target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <div className="card form-card">
                        <h2>Send us a Message</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" name="email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" name="phone" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" name="subject" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="5" required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Send Message
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="map-section">
                <div className="card map-card">
                    <h2>Our Location</h2>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.8!2d39.2!3d-6.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnMDAuMCJTIDM5wrAxMicwMC4wIkU!5e0!3m2!1sen!2stz!4v1234567890"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Llador Store Location Map"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;