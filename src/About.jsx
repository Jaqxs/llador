import React from 'react';
import Navigation from './components/Navigation';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/global.css';
import './styles/animations.css';
import './About.css';

const About = () => {
    const headerRef = useScrollReveal(0.5);
    const storyRef = useScrollReveal(0.3);
    const teamRef = useScrollReveal(0.3);
    const valuesRef = useScrollReveal(0.3);
    const statsRef = useScrollReveal(0.3);
    const missionRef = useScrollReveal(0.3);

    return (
        <div className="about-container">
            <Navigation activePage="about" />
            
            {/* Header Section */}
            <section className="about-header scroll-reveal" ref={headerRef}>
                <div className="container">
                    <h1 className="animate-fade-in">About Llador</h1>
                    <p className="animate-fade-in-up">Discover our story and mission</p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="story-section scroll-reveal" ref={storyRef}>
                <div className="container">
                    <div className="story-content">
                        <div className="story-text animate-fade-in-up">
                            <h2>Our Story</h2>
                            <p>Founded in 2024, Llador has been at the forefront of luxury fragrances in Tanzania. Our journey began with a simple mission: to provide high-quality perfumes that enhance the natural beauty of our customers.</p>
                            <p>Today, we're proud to offer a curated collection of premium fragrances that combine traditional craftsmanship with modern innovation.</p>
                        </div>
                        <div className="story-image animate-fade-in">
                            <img 
                                src="/winy.jpg"
                                alt="Our Story" 
                                className="story-img"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section scroll-reveal" ref={missionRef}>
                <div className="container">
                    <div className="mission-content">
                        <h2 className="text-center animate-fade-in-up">Our Mission</h2>
                        <div className="mission-grid">
                            <div className="mission-card animate-fade-in-up">
                                <div className="mission-icon">🎯</div>
                                <h3>Quality First</h3>
                                <p>We strive to provide the highest quality fragrances that exceed our customers' expectations.</p>
                            </div>
                            <div className="mission-card animate-fade-in-up">
                                <div className="mission-icon">🌍</div>
                                <h3>Global Reach</h3>
                                <p>Bringing Tanzanian luxury fragrances to customers worldwide.</p>
                            </div>
                            <div className="mission-card animate-fade-in-up">
                                <div className="mission-icon">💝</div>
                                <h3>Customer Focus</h3>
                                <p>Dedicated to providing exceptional service and satisfaction to our customers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section scroll-reveal" ref={statsRef}>
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-card animate-fade-in-up">
                            <h3>1000+</h3>
                            <p>Happy Customers</p>
                        </div>
                        <div className="stat-card animate-fade-in-up">
                            <h3>50+</h3>
                            <p>Premium Fragrances</p>
                        </div>
                        <div className="stat-card animate-fade-in-up">
                            <h3>24/7</h3>
                            <p>Customer Support</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section scroll-reveal" ref={teamRef}>
                <div className="container">
                    <h2 className="text-center animate-fade-in-up">Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member animate-fade-in-up">
                            <div className="member-image">
                                <img 
                                    src="/winy.jpg"
                                    alt="CEO of Llador Store TZ" 
                                    className="ceo-image"
                                />
                            </div>
                            <div className="member-info">
                                <h3>Winy</h3>
                                <p>CEO & Founder</p>
                                <div className="social-links">
                                    <a href="#" className="social-link">LinkedIn</a>
                                    <a href="#" className="social-link">Twitter</a>
                                    <a href="#" className="social-link">Instagram</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section scroll-reveal" ref={valuesRef}>
                <div className="container">
                    <h2 className="text-center animate-fade-in-up">Our Values</h2>
                    <div className="values-grid">
                        <div className="value-card animate-fade-in-up">
                            <div className="value-icon">✨</div>
                            <h3>Quality</h3>
                            <p>We never compromise on the quality of our products, ensuring each fragrance meets our high standards.</p>
                        </div>
                        <div className="value-card animate-fade-in-up">
                            <div className="value-icon">💡</div>
                            <h3>Innovation</h3>
                            <p>We continuously explore new fragrance combinations and stay ahead of industry trends.</p>
                        </div>
                        <div className="value-card animate-fade-in-up">
                            <div className="value-icon">🌱</div>
                            <h3>Sustainability</h3>
                            <p>We're committed to environmentally responsible practices in our production and packaging.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About; 