import React from 'react';
import Navigation from './components/Navigation';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/global.css';
import './styles/animations.css';
import './About.css';

const About = () => {
    const headerRef = useScrollReveal(0.5);
    const ceoRef = useScrollReveal(0.3);
    const valuesRef = useScrollReveal(0.3);
    const contactRef = useScrollReveal(0.3);

    return (
        <div className="about-container">
            <Navigation activePage="about" />
            
            <section className="about-hero scroll-reveal" ref={headerRef}>
                <div className="hero-content animate-fade-in">
                    <h1 className="animate-fade-in-up">About Llador Store TZ</h1>
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Your destination for luxury fragrances in Tanzania
                    </p>
                    <div className="scroll-indicator animate-bounce">
                        <span>Scroll Down</span>
                        <div className="scroll-arrow"></div>
                    </div>
                </div>
            </section>

            <section className="about-section scroll-reveal" ref={ceoRef}>
                <div className="container">
                    <div className="ceo-section">
                        <div className="ceo-image-container">
                            <img
                                src="images/winy.jpg"
                                alt="CEO of Llador Store TZ"
                                className="ceo-image"
                            />
                        </div>
                        <div className="ceo-message">
                            <h2>Our Story</h2>
                            <p>
                                Welcome to Llador Store TZ, where luxury meets authenticity. 
                                Founded with a passion for bringing the finest fragrances to Tanzania, 
                                we curate a collection that represents the epitome of elegance and sophistication.
                            </p>
                            <p>
                                Our journey began with a simple vision: to provide our customers with 
                                access to world-class perfumes that enhance their natural beauty and 
                                reflect their unique personality.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="values-section scroll-reveal" ref={valuesRef}>
                <div className="container">
                    <h2 className="text-center">Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">✨</div>
                            <h3>Quality</h3>
                            <p>We offer only the finest fragrances from renowned brands worldwide.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🤝</div>
                            <h3>Trust</h3>
                            <p>Building lasting relationships with our customers through transparency and reliability.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">💫</div>
                            <h3>Excellence</h3>
                            <p>Committed to providing exceptional service and products.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section scroll-reveal" ref={contactRef}>
                <div className="container">
                    <h2 className="text-center">Connect With Us</h2>
                    <div className="social-links">
                        <a
                            href="https://instagram.com/llador_store_tz"
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