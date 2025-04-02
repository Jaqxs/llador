import React, { useState } from 'react';
import './Store.css';

const Store = () => {
    const [products] = useState([
        {
            id: 1,
            name: "Midnight Rose",
            price: 99.99,
            description: "A luxurious blend of rose and vanilla with deep woody undertones",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            category: "Women"
        },
        {
            id: 2,
            name: "Ocean Breeze",
            price: 149.99,
            description: "Fresh and invigorating with notes of sea salt and citrus",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            category: "Unisex"
        },
        {
            id: 3,
            name: "Royal Oud",
            price: 199.99,
            description: "Rich and sophisticated with authentic Oud wood essence",
            image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            category: "Men"
        }
    ]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);

    const filteredProducts = products.filter(product => {
        const matchesFilter = filter === 'all' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

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
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
                        <option value="all">All Products</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>

                <div className="products-grid">
                    {filteredProducts.map(product => (
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
                                </div>
                            </div>
                            <div className="product-info">
                                <h3>{product.name}</h3>
                                <p className="price">${product.price}</p>
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