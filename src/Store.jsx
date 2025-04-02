import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Store.css';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedPriceRange, setSelectedPriceRange] = useState('all');
    const [selectedRating, setSelectedRating] = useState('all');

    // Initialize default products if none exist
    const initializeDefaultProducts = () => {
        const defaultProducts = [
            {
                id: 1,
                name: "Midnight Rose",
                price: 99.99,
                description: "A luxurious blend of rose and vanilla with deep woody undertones",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "Women",
                rating: 4.8,
                reviews: 128,
                stock: 15
            },
            {
                id: 2,
                name: "Ocean Breeze",
                price: 149.99,
                description: "Fresh and invigorating with notes of sea salt and citrus",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "Unisex",
                rating: 4.6,
                reviews: 95,
                stock: 20
            },
            {
                id: 3,
                name: "Royal Oud",
                price: 199.99,
                description: "Rich and sophisticated with authentic Oud wood essence",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "Men",
                rating: 4.9,
                reviews: 156,
                stock: 10
            },
            {
                id: 4,
                name: "Vanilla Dreams",
                price: 89.99,
                description: "Sweet and comforting with Madagascar vanilla and warm spices",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "Women",
                rating: 4.7,
                reviews: 82,
                stock: 25
            },
            {
                id: 5,
                name: "Mountain Pine",
                price: 129.99,
                description: "Fresh and woody with notes of pine and cedar",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "Men",
                rating: 4.5,
                reviews: 64,
                stock: 18
            },
            {
                id: 6,
                name: "Citrus Splash",
                price: 79.99,
                description: "Bright and energetic with orange and lemon notes",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "Unisex",
                rating: 4.4,
                reviews: 45,
                stock: 30
            },
            {
                id: 7,
                name: "Lavender Fields",
                price: 119.99,
                description: "Calming and floral with French lavender and chamomile",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "Women",
                rating: 4.7,
                reviews: 73,
                stock: 12
            },
            {
                id: 8,
                name: "Leather & Spice",
                price: 169.99,
                description: "Bold and masculine with leather and black pepper",
                image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
                category: "Men",
                rating: 4.8,
                reviews: 92,
                stock: 15
            }
        ];

        localStorage.setItem('products', JSON.stringify(defaultProducts));
        setProducts(defaultProducts);
    };

    // Load products from localStorage or initialize defaults
    useEffect(() => {
        const savedProducts = JSON.parse(localStorage.getItem('products'));
        if (savedProducts && savedProducts.length > 0) {
            setProducts(savedProducts);
        } else {
            initializeDefaultProducts();
        }
    }, []);

    // Load wishlist from localStorage
    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);
    }, []);

    // Save wishlist to localStorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const filteredProducts = products.filter(product => {
        const matchesFilter = filter === 'all' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPriceRange = selectedPriceRange === 'all' || 
            (selectedPriceRange === 'under50' && product.price < 50) ||
            (selectedPriceRange === '50to100' && product.price >= 50 && product.price <= 100) ||
            (selectedPriceRange === '100to200' && product.price > 100 && product.price <= 200) ||
            (selectedPriceRange === 'over200' && product.price > 200);
        const matchesRating = selectedRating === 'all' || product.rating >= parseFloat(selectedRating);
        
        return matchesFilter && matchesSearch && matchesPriceRange && matchesRating;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'reviews':
                return b.reviews - a.reviews;
            default:
                return 0;
        }
    });

    const toggleWishlist = (productId) => {
        setWishlist(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const addToCart = (product) => {
        setCart([...cart, product]);
        setIsModalOpen(false);
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleWhatsAppOrder = (product) => {
        const message = `Hello, I'd like to order ${product.name} priced at $${product.price} from Llador Store TZ`;
        const whatsappUrl = `https://wa.me/+255123456789?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    return (
        <div className="store-container">
            {/* Navigation Bar */}
            <nav className="store-nav">
                <div className="nav-brand">
                    <Link to="/">Llador Store TZ</Link>
                </div>
                <div className="nav-links">
                    <Link to="/" className="active">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/admin">Admin</Link>
                </div>
                <div className="nav-actions">
                    <Link to="/wishlist" className="wishlist-link">
                        Wishlist ({wishlist.length})
                    </Link>
                    <button 
                        className="cart-button"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                    >
                        Cart ({cart.length})
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Llador Store TZ</h1>
                    <p className="hero-tagline">Discover the Essence of Luxury</p>
                    <button className="cta-button" onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
                        Shop Now
                    </button>
                </div>
            </section>

            {/* Products Section */}
            <section id="products-section" className="products-section">
                <div className="filters">
                    <div className="search-sort">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                            <option value="reviews">Most Reviewed</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
                            <option value="all">All Categories</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                        <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)} className="filter-select">
                            <option value="all">All Prices</option>
                            <option value="under50">Under $50</option>
                            <option value="50to100">$50 - $100</option>
                            <option value="100to200">$100 - $200</option>
                            <option value="over200">Over $200</option>
                        </select>
                        <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)} className="filter-select">
                            <option value="all">All Ratings</option>
                            <option value="4.5">4.5+ Stars</option>
                            <option value="4">4+ Stars</option>
                            <option value="3">3+ Stars</option>
                        </select>
                    </div>
                </div>

                <div className="products-grid">
                    {sortedProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} className="product-image" />
                                <div className="product-overlay">
                                    <button 
                                        className="view-details-btn"
                                        onClick={() => openProductModal(product)}
                                    >
                                        View Details
                                    </button>
                                    <button 
                                        className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                                        onClick={() => toggleWishlist(product.id)}
                                    >
                                        {wishlist.includes(product.id) ? '❤️' : '🤍'}
                                    </button>
                                </div>
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <div className="product-rating">
                                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}</span>
                                    <span className="reviews">({product.reviews})</span>
                                </div>
                                <p className="price">${product.price}</p>
                                <p className="stock">In Stock: {product.stock}</p>
                                <p className="description">{product.description}</p>
                                <button 
                                    className="buy-now-btn"
                                    onClick={() => handleWhatsAppOrder(product)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Cart Icon */}
            <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
                <span className="cart-count">{cart.length}</span>
                🛒
            </div>

            {/* Cart Sidebar */}
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>Shopping Cart</h3>
                    <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
                </div>
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                                <p>${item.price}</p>
                            </div>
                            <button 
                                className="remove-item"
                                onClick={() => removeFromCart(item.id)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <div className="cart-footer">
                    <div className="cart-total">
                        <span>Total:</span>
                        <span>${calculateTotal()}</span>
                    </div>
                    <button 
                        className="checkout-btn"
                        onClick={() => {
                            const message = `Hello, I'd like to order the following items from Llador Store TZ:\n${cart.map(item => `${item.name} - $${item.price}`).join('\n')}\nTotal: $${calculateTotal()}`;
                            const whatsappUrl = `https://wa.me/+255123456789?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                        }}
                    >
                        Checkout via WhatsApp
                    </button>
                </div>
            </div>

            {/* Product Modal */}
            {isModalOpen && selectedProduct && (
                <div className="product-modal">
                    <div className="product-details">
                        <button className="close-modal" onClick={closeProductModal}>×</button>
                        <div className="modal-image-container">
                            <img src={selectedProduct.image} alt={selectedProduct.name} />
                        </div>
                        <h2>{selectedProduct.name}</h2>
                        <p className="price">${selectedProduct.price}</p>
                        <p className="description">{selectedProduct.description}</p>
                        <div className="modal-buttons">
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => addToCart(selectedProduct)}
                            >
                                Add to Cart
                            </button>
                            <button 
                                className="buy-now-btn"
                                onClick={() => handleWhatsAppOrder(selectedProduct)}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Store; 