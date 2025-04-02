import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/global.css';
import './styles/animations.css';
import './Home.css';

const Home = () => {
    const heroRef = useScrollReveal(0.5);
    const featuredRef = useScrollReveal(0.2);
    const categoriesRef = useScrollReveal(0.2);
    const newsletterRef = useScrollReveal(0.2);

    useEffect(() => {
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }, []);

    return (
        <div className="home-container">
            <Navigation activePage="home" />
            
            <section className="hero-section" ref={heroRef}>
                <div className="hero-content animate-fade-in">
                    <h1 className="animate-fade-in-up">Discover Your Signature Scent</h1>
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Explore our curated collection of luxury fragrances
                    </p>
                    <Link to="/store" className="btn btn-primary animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        Shop Now
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
                <div className="hero-scroll animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <span>Scroll Down</span>
                    <i className="fas fa-chevron-down animate-bounce"></i>
                </div>
            </section>

            <section className="featured-products scroll-reveal" ref={featuredRef}>
                <h2 className="text-center animate-fade-in-up">Featured Products</h2>
                <div className="products-grid stagger-animation">
                    <div className="card product-card hover-lift">
                        <div className="product-image">
                            <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Luxury Perfume" />
                            <div className="product-overlay">
                                <button className="btn btn-accent hover-scale">Add to Cart</button>
                            </div>
                        </div>
                        <div className="product-info">
                            <h3>Luxury Fragrance</h3>
                            <p className="price">$99.99</p>
                        </div>
                    </div>
                    {/* Add more product cards as needed */}
                </div>
            </section>

            <section className="categories-section scroll-reveal" ref={categoriesRef}>
                <h2 className="text-center animate-fade-in-up">Shop by Category</h2>
                <div className="categories-grid stagger-animation">
                    <div className="card category-card hover-lift">
                        <i className="fas fa-female animate-pulse"></i>
                        <h3>Women's Perfumes</h3>
                        <Link to="/store?category=womens" className="btn btn-outline hover-scale">Explore</Link>
                    </div>
                    <div className="card category-card hover-lift">
                        <i className="fas fa-male animate-pulse" style={{ animationDelay: '0.2s' }}></i>
                        <h3>Men's Perfumes</h3>
                        <Link to="/store?category=mens" className="btn btn-outline hover-scale">Explore</Link>
                    </div>
                    <div className="card category-card hover-lift">
                        <i className="fas fa-gift animate-pulse" style={{ animationDelay: '0.4s' }}></i>
                        <h3>Gift Sets</h3>
                        <Link to="/store?category=gifts" className="btn btn-outline hover-scale">Explore</Link>
                    </div>
                </div>
            </section>

            <section className="newsletter-section scroll-reveal" ref={newsletterRef}>
                <div className="card newsletter-card hover-lift">
                    <h2 className="animate-fade-in-up">Stay Updated</h2>
                    <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Subscribe to our newsletter for exclusive offers and new arrivals
                    </p>
                    <form className="newsletter-form animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <input type="email" placeholder="Enter your email" className="hover-scale" />
                        <button type="submit" className="btn btn-primary hover-scale">
                            Subscribe
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home; 