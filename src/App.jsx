import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './Home';
import Store from './Store';
import About from './About';
import Contact from './Contact';
import { initializeProducts } from './utils/initializeProducts';

// Initialize products when the app starts
initializeProducts();

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App; 