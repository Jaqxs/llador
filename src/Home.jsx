import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/global.css';
import './styles/animations.css';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const headerRef = useScrollReveal(0.5);
    const featuredRef = useScrollReveal(0.3);
    const categoriesRef = useScrollReveal(0.3);

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const savedProducts = JSON.parse(localStorage.getItem('products'));
                if (savedProducts && savedProducts.length > 0) {
                    setProducts(savedProducts);
                    // Get 3 featured products
                    setFeaturedProducts(savedProducts.slice(0, 3));
                }
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    return (
        <div className="home-container">
            <Navigation activePage="home" />
            
            {/* Hero Section with 3D Perfume */}
            <section className="hero-section scroll-reveal" ref={headerRef}>
                <div className="hero-content animate-fade-in">
                    <div className="hero-text animate-fade-in-up">
                        <h1>Luxury Fragrances</h1>
                        <p>Discover our exclusive collection of premium perfumes</p>
                        <Link to="/store" className="btn btn-primary hover-scale">
                            Shop Now
                        </Link>
                    </div>
                    <div className="hero-3d">
                        <div className="perfume-3d">
                            <div className="bottle">
                                <div className="bottle-body"></div>
                                <div className="bottle-neck"></div>
                                <div className="bottle-cap"></div>
                                <div className="liquid"></div>
                            </div>
                            <div className="spray-effect"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section scroll-reveal" ref={featuredRef}>
                <div className="container">
                    <h2 className="text-center animate-fade-in-up">Featured Products</h2>
                    <div className="featured-grid">
                        {featuredProducts.map(product => (
                            <div key={product.id} className="featured-card hover-lift">
                                <div className="featured-image">
                                    <img src={product.image} alt={product.name} />
                                    <div className="featured-overlay">
                                        <Link to="/store" className="btn btn-accent hover-scale">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                                <div className="featured-info">
                                    <h3>{product.name}</h3>
                                    <p className="price">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section scroll-reveal" ref={categoriesRef}>
                <div className="container">
                    <h2 className="text-center animate-fade-in-up">Shop by Category</h2>
                    <div className="categories-grid">
                        <Link to="/store?category=womens" className="category-card hover-lift">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Women's Perfumes" />
                            </div>
                            <div className="category-content">
                                <h3>Women's Perfumes</h3>
                                <p>Discover our collection of feminine fragrances</p>
                            </div>
                        </Link>
                        <Link to="/store?category=mens" className="category-card hover-lift">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Men's Perfumes" />
                            </div>
                            <div className="category-content">
                                <h3>Men's Perfumes</h3>
                                <p>Explore our selection of masculine scents</p>
                            </div>
                        </Link>
                        <Link to="/store?category=gifts" className="category-card hover-lift">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Gift Sets" />
                            </div>
                            <div className="category-content">
                                <h3>Gift Sets</h3>
                                <p>Perfect presents for your loved ones</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section scroll-reveal">
                <div className="container">
                    <div className="newsletter-content animate-fade-in-up">
                        <h2>Subscribe to Our Newsletter</h2>
                        <p>Get updates about new products and special offers</p>
                        <form className="newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="newsletter-input"
                            />
                            <button type="submit" className="btn btn-accent hover-scale">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 