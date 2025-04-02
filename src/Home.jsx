import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/global.css';
import './styles/animations.css';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const heroRef = useScrollReveal(0.5);
    const featuredRef = useScrollReveal(0.3);
    const categoriesRef = useScrollReveal(0.3);
    const newsletterRef = useScrollReveal(0.3);

    useEffect(() => {
        const loadProducts = () => {
            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            setProducts(storedProducts);
            // Select 3 random products for featured section
            const shuffled = [...storedProducts].sort(() => 0.5 - Math.random());
            setFeaturedProducts(shuffled.slice(0, 3));
        };

        loadProducts();
    }, []);

    return (
        <div className="home-container">
            <Navigation activePage="home" />
            
            {/* Hero Section with 3D Perfume */}
            <section className="hero-section scroll-reveal" ref={heroRef}>
                <div className="hero-content">
                    <div className="hero-text animate-fade-in">
                        <h1 className="animate-fade-in-up">Discover Your Signature Scent</h1>
                        <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            Luxury fragrances for the modern individual
                        </p>
                        <Link to="/store" className="btn btn-primary animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                            Shop Now
                        </Link>
                    </div>
                    <div className="hero-3d animate-fade-in">
                        <div className="perfume-3d">
                            <div className="bottle">
                                <div className="bottle-body">
                                    <div className="liquid"></div>
                                </div>
                                <div className="bottle-neck"></div>
                                <div className="bottle-cap"></div>
                            </div>
                            <div className="spray-effect"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="featured-section scroll-reveal" ref={featuredRef}>
                <div className="container">
                    <h2 className="text-center animate-fade-in-up">Featured Products</h2>
                    <div className="featured-grid">
                        {featuredProducts.map((product, index) => (
                            <div key={product.id} className="featured-card animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="featured-image">
                                    <img src={product.image} alt={product.name} />
                                    <div className="featured-overlay">
                                        <Link to={`/store?product=${product.id}`} className="btn btn-light">
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
                        <Link to="/store?category=womens" className="category-card animate-fade-in-up">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Women's Perfumes" />
                            </div>
                            <div className="category-content">
                                <h3>Women's Perfumes</h3>
                                <p>Discover your signature scent</p>
                            </div>
                        </Link>
                        <Link to="/store?category=mens" className="category-card animate-fade-in-up">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Men's Perfumes" />
                            </div>
                            <div className="category-content">
                                <h3>Men's Perfumes</h3>
                                <p>Find your perfect fragrance</p>
                            </div>
                        </Link>
                        <Link to="/store?category=gift-sets" className="category-card animate-fade-in-up">
                            <div className="category-image">
                                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Gift Sets" />
                            </div>
                            <div className="category-content">
                                <h3>Gift Sets</h3>
                                <p>Perfect presents for loved ones</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="newsletter-section scroll-reveal" ref={newsletterRef}>
                <div className="container">
                    <div className="newsletter-content">
                        <h2 className="animate-fade-in-up">Stay Updated</h2>
                        <p className="animate-fade-in-up">Subscribe to our newsletter for exclusive offers and updates</p>
                        <form className="newsletter-form animate-fade-in-up">
                            <input type="email" placeholder="Enter your email" className="newsletter-input" />
                            <button type="submit" className="btn btn-light">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 