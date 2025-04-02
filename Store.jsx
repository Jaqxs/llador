import React, { useState, useEffect } from 'react';
import './Store.css';

const Store = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
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

            {/* Product Modal */}
            <div className="product-modal">
                <div className="product-details">
                    <ul>
                        {/* Product details will be mapped here */}
                    </ul>
                    <button 
                        className="btn add-to-cart-btn"
                        onClick={() => {
                            addToCart(product);
                            onClose();
                        }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Store; 