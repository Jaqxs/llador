import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import useScrollReveal from './hooks/useScrollReveal';
import './styles/global.css';
import './styles/animations.css';
import './Store.css';

const Store = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const headerRef = useScrollReveal(0.5);
    const filtersRef = useScrollReveal(0.2);
    const productsRef = useScrollReveal(0.2);

    const categories = [
        { id: 'all', name: 'All Products' },
        { id: 'womens', name: "Women's Perfumes" },
        { id: 'mens', name: "Men's Perfumes" },
        { id: 'gifts', name: 'Gift Sets' }
    ];

    const priceRanges = [
        { id: 'all', name: 'All Prices' },
        { id: 'under50', name: 'Under $50' },
        { id: '50to100', name: '$50 - $100' },
        { id: 'over100', name: 'Over $100' }
    ];

    const sortOptions = [
        { id: 'featured', name: 'Featured' },
        { id: 'price-low', name: 'Price: Low to High' },
        { id: 'price-high', name: 'Price: High to Low' },
        { id: 'newest', name: 'Newest First' }
    ];

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
        // Simulate loading products
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const savedProducts = JSON.parse(localStorage.getItem('products'));
                if (savedProducts && savedProducts.length > 0) {
                    setProducts(savedProducts);
                } else {
                    initializeDefaultProducts();
                }
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
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
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPriceRange = priceRange === 'all' || 
            (priceRange === 'under50' && product.price < 50) ||
            (priceRange === '50to100' && product.price >= 50 && product.price <= 100) ||
            (priceRange === 'over100' && product.price > 100);
        
        return matchesCategory && matchesPriceRange;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'newest':
                return b.id - a.id;
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
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleWhatsAppOrder = (product) => {
        const message = `Hello, I'd like to order ${product.name} priced at $${product.price} from Llador Store TZ`;
        const whatsappUrl = `https://wa.me/+255746718133?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="store-container">
            <Navigation activePage="store" />
            
            <div className="store-header scroll-reveal" ref={headerRef}>
                <h1 className="animate-fade-in-up">Our Collection</h1>
                <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Discover our curated selection of luxury fragrances
                </p>
            </div>

            <div className="store-content">
                <aside className="filters-sidebar scroll-reveal" ref={filtersRef}>
                    <div className="card filter-card hover-lift">
                        <h3 className="animate-fade-in-up">Categories</h3>
                        <div className="filter-options stagger-animation">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`filter-option ${selectedCategory === category.id ? 'active' : ''} hover-scale`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card filter-card hover-lift">
                        <h3 className="animate-fade-in-up">Price Range</h3>
                        <div className="filter-options stagger-animation">
                            {priceRanges.map(range => (
                                <button
                                    key={range.id}
                                    className={`filter-option ${priceRange === range.id ? 'active' : ''} hover-scale`}
                                    onClick={() => setPriceRange(range.id)}
                                >
                                    {range.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <main className="products-section scroll-reveal" ref={productsRef}>
                    <div className="products-header animate-fade-in-up">
                        <div className="products-count">
                            Showing {sortedProducts.length} products
                        </div>
                        <div className="sort-selector">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="sort-select hover-scale"
                            >
                                {sortOptions.map(option => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading products...</p>
                        </div>
                    ) : (
                        <div className="products-grid stagger-animation">
                            {sortedProducts.map(product => (
                                <div key={product.id} className="card product-card hover-lift">
                                    <div className="product-image">
                                        <img src={product.image} alt={product.name} />
                                        <div className="product-overlay">
                                            <button 
                                                className="btn btn-accent hover-scale"
                                                onClick={() => addToCart(product)}
                                            >
                                                Add to Cart
                                            </button>
                                            <button 
                                                className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''} hover-scale`}
                                                onClick={() => toggleWishlist(product.id)}
                                            >
                                                {wishlist.includes(product.id) ? '❤️' : '🤍'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <h3>{product.name}</h3>
                                        <p className="price">${product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="pagination animate-fade-in-up">
                        <button className="btn btn-outline hover-scale">Previous</button>
                        <div className="page-numbers">
                            <button className="btn btn-outline active hover-scale">1</button>
                            <button className="btn btn-outline hover-scale">2</button>
                            <button className="btn btn-outline hover-scale">3</button>
                            <span>...</span>
                            <button className="btn btn-outline hover-scale">10</button>
                        </div>
                        <button className="btn btn-outline hover-scale">Next</button>
                    </div>
                </main>
            </div>

            {/* Cart Icon */}
            <div className="cart-icon hover-scale" onClick={() => document.getElementById('cart-sidebar').scrollIntoView({ behavior: 'smooth' })}>
                🛒
            </div>

            {/* Cart Sidebar */}
            <div id="cart-sidebar" className={`cart-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h3>Shopping Cart</h3>
                    <button className="close-cart hover-scale" onClick={() => document.getElementById('cart-sidebar').classList.remove('open')}>×</button>
                </div>
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item animate-fade-in">
                            <img src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                                <p>${item.price}</p>
                            </div>
                            <button 
                                className="remove-item hover-scale"
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
                        className="checkout-btn hover-scale"
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
                <div className="product-modal animate-fade-in">
                    <div className="product-details animate-scale-in">
                        <button className="close-modal hover-scale" onClick={() => setIsModalOpen(false)}>×</button>
                        <div className="modal-image-container">
                            <img src={selectedProduct.image} alt={selectedProduct.name} />
                        </div>
                        <h2>{selectedProduct.name}</h2>
                        <p className="price">${selectedProduct.price}</p>
                        <p className="description">{selectedProduct.description}</p>
                        <div className="modal-buttons">
                            <button 
                                className="add-to-cart-btn hover-scale"
                                onClick={() => addToCart(selectedProduct)}
                            >
                                Add to Cart
                            </button>
                            <button 
                                className="buy-now-btn hover-scale"
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