import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './context/CartContext';
import Navigation from './components/Navigation';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/global.css';
import './styles/animations.css';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useCart();
    const productsPerPage = 6;
    const bottleRef = useRef(null);

    const headerRef = useScrollReveal(0.5);
    const featuredRef = useScrollReveal(0.3);
    const categoriesRef = useScrollReveal(0.3);
    const newsletterRef = useScrollReveal(0.3);

    useEffect(() => {
        const loadProducts = () => {
            const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
            setProducts(savedProducts);
        };

        loadProducts();

        // Add mouse move effect for 3D bottle
        const handleMouseMove = (e) => {
            if (!bottleRef.current) return;
            
            const bottle = bottleRef.current;
            const rect = bottle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            bottle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            if (bottleRef.current) {
                bottleRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            }
        };

        const bottle = bottleRef.current;
        if (bottle) {
            bottle.addEventListener('mousemove', handleMouseMove);
            bottle.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (bottle) {
                bottle.removeEventListener('mousemove', handleMouseMove);
                bottle.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
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

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
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

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send this to your backend
        alert('Thank you for subscribing!');
        e.target.reset();
    };

    // Add pagination controls to the featured products section
    const renderPagination = () => {
        if (totalPages <= 1) return null;
        return (
            <div className="pagination-controls">
                <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
        );
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
                    <div className="perfume-bottle" ref={bottleRef}>
                        <div className="bottle-body">
                            <div className="bottle-reflection"></div>
                        </div>
                        <div className="bottle-neck">
                            <div className="bottle-neck-reflection"></div>
                        </div>
                        <div className="bottle-cap">
                            <div className="bottle-cap-reflection"></div>
                        </div>
                        <div className="liquid">
                            <div className="liquid-reflection"></div>
                        </div>
                        <div className="spray-effect"></div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="featured-section scroll-reveal" ref={featuredRef}>
                <div className="container">
                    <h2 className="section-title animate-fade-in-up">Featured Products</h2>
                    <div className="featured-grid">
                        {paginatedProducts.map((product) => (
                            <div key={product.id} className="featured-card animate-fade-in-up">
                                <div className="featured-image-container">
                                    <img src={product.image} alt={product.name} className="featured-image" />
                                    <div className="featured-overlay">
                                        <button 
                                            onClick={() => handleAddToCart(product)}
                                            id={`add-to-cart-${product.id}`}
                                            className="view-button"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                                <div className="featured-info">
                                    <h3>{product.name}</h3>
                                    <p className="price">${product.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {renderPagination()}
                </div>
            </section>

            {/* Categories */}
            <section className="categories-section scroll-reveal" ref={categoriesRef}>
                <div className="container">
                    <h2 className="section-title animate-fade-in-up">Shop by Category</h2>
                    <div className="categories-grid">
                        <button 
                            onClick={() => handleCategoryChange('women')}
                            className="category-card animate-fade-in-up"
                        >
                            <div className="category-icon">👩</div>
                            <h3>Women's Perfumes</h3>
                        </button>
                        <button 
                            onClick={() => handleCategoryChange('men')}
                            className="category-card animate-fade-in-up"
                        >
                            <div className="category-icon">👨</div>
                            <h3>Men's Perfumes</h3>
                        </button>
                        <button 
                            onClick={() => handleCategoryChange('gifts')}
                            className="category-card animate-fade-in-up"
                        >
                            <div className="category-icon">🎁</div>
                            <h3>Gift Sets</h3>
                        </button>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-section scroll-reveal" ref={newsletterRef}>
                <div className="container">
                    <div className="newsletter-content animate-fade-in-up">
                        <h2>Subscribe to Our Newsletter</h2>
                        <p>Get updates on new products and exclusive offers</p>
                        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                            <input 
                                type="email" 
                                name="email"
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