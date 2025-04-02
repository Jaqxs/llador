import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Navigation from './components/Navigation';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/global.css';
import './styles/animations.css';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useCart();
    const productsPerPage = 6;

    const headerRef = useScrollReveal(0.5);
    const featuredRef = useScrollReveal(0.3);
    const categoriesRef = useScrollReveal(0.3);
    const newsletterRef = useScrollReveal(0.3);

    useEffect(() => {
        const loadProducts = () => {
            const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
            setProducts(savedProducts);
            
            // Select 3 random featured products
            const shuffled = [...savedProducts].sort(() => 0.5 - Math.random());
            setFeaturedProducts(shuffled.slice(0, 3));
        };

        loadProducts();
    }, []);

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.category === selectedCategory);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        // Show feedback to user
        const button = document.getElementById(`add-to-cart-${product.id}`);
        if (button) {
            button.textContent = 'Added!';
            button.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.backgroundColor = '#ff6b6b';
            }, 2000);
        }
    };

    return (
        <div className="home-container">
            <Navigation activePage="home" />
            
            {/* Hero Section */}
            <section className="hero-section scroll-reveal" ref={headerRef}>
                <div className="hero-content">
                    <h1 className="animate-fade-in">Discover Your Signature Scent</h1>
                    <p className="animate-fade-in-up">Explore our collection of premium fragrances</p>
                    <Link to="/store" className="cta-button animate-fade-in-up">
                        Shop Now
                    </Link>
                </div>
                <div className="hero-image animate-fade-in">
                    <div className="perfume-bottle">
                        <div className="bottle-body"></div>
                        <div className="bottle-neck"></div>
                        <div className="bottle-cap"></div>
                        <div className="liquid"></div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section scroll-reveal" ref={featuredRef}>
                <div className="container">
                    <h2 className="section-title animate-fade-in-up">Featured Products</h2>
                    <div className="featured-grid">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="featured-card animate-fade-in-up">
                                <img src={product.image} alt={product.name} className="featured-image" />
                                <div className="featured-info">
                                    <h3>{product.name}</h3>
                                    <p className="price">${product.price}</p>
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        id={`add-to-cart-${product.id}`}
                                        className="view-button"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories-section scroll-reveal" ref={categoriesRef}>
                <div className="container">
                    <h2 className="section-title animate-fade-in-up">Shop by Category</h2>
                    <div className="categories-grid">
                        <Link to="/store?category=women" className="category-card animate-fade-in-up">
                            <div className="category-icon">👩</div>
                            <h3>Women's Perfumes</h3>
                        </Link>
                        <Link to="/store?category=men" className="category-card animate-fade-in-up">
                            <div className="category-icon">👨</div>
                            <h3>Men's Perfumes</h3>
                        </Link>
                        <Link to="/store?category=gifts" className="category-card animate-fade-in-up">
                            <div className="category-icon">🎁</div>
                            <h3>Gift Sets</h3>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section scroll-reveal" ref={newsletterRef}>
                <div className="container">
                    <div className="newsletter-content animate-fade-in-up">
                        <h2>Subscribe to Our Newsletter</h2>
                        <p>Get updates on new products and exclusive offers</p>
                        <form className="newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                required 
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 