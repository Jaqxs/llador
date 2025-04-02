import React, { useState, useEffect } from 'react';
import './Store.css';

const Store = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Sample product data
    const products = [
        {
            id: 1,
            name: "Product 1",
            price: 99.99,
            description: "This is product 1"
        },
        {
            id: 2,
            name: "Product 2",
            price: 149.99,
            description: "This is product 2"
        }
    ];

    const addToCart = (product) => {
        setCart([...cart, product]);
        setIsModalOpen(false);
    };

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    return (
        <div className="store-container">
            {/* Newsletter Subscription Section */}
            <div className="newsletter-section">
                {!isSubscribed ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setIsSubscribed(true);
                    }}>
                        <h3>Subscribe to Our Newsletter</h3>
                        <input type="email" placeholder="Enter your email" required />
                        <button type="submit" className="btn">Subscribe</button>
                    </form>
                ) : (
                    <div className="success-message">
                        <p>You've been successfully subscribed!</p>
                        <button 
                            className="btn" 
                            onClick={() => setIsSubscribed(false)}
                        >
                            Subscribe Another Email
                        </button>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <button 
                            className="btn"
                            onClick={() => openProductModal(product)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            {/* Cart Summary */}
            {cart.length > 0 && (
                <div className="cart-summary">
                    <h3>Cart ({cart.length} items)</h3>
                </div>
            )}

            {/* Product Modal */}
            {isModalOpen && selectedProduct && (
                <div className="product-modal">
                    <div className="product-details">
                        <h2>{selectedProduct.name}</h2>
                        <p>${selectedProduct.price}</p>
                        <p>{selectedProduct.description}</p>
                        <button 
                            className="btn add-to-cart-btn"
                            onClick={() => addToCart(selectedProduct)}
                        >
                            Add to Cart
                        </button>
                        <button 
                            className="btn"
                            onClick={closeProductModal}
                            style={{ marginTop: '10px', backgroundColor: '#dc3545' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Store; 