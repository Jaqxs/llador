import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'Men'
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Load products from localStorage
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple authentication (replace with proper authentication in production)
        if (username === 'admin' && password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = {
            id: Date.now(),
            ...newProduct,
            price: parseFloat(newProduct.price)
        };
        const updatedProducts = [...products, product];
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setNewProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            category: 'Men'
        });
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setNewProduct(product);
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const updatedProducts = products.map(product =>
            product.id === editingProduct.id ? { ...newProduct, id: product.id, price: parseFloat(newProduct.price) } : product
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setEditingProduct(null);
        setNewProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            category: 'Men'
        });
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
    };

    const handleDragStart = (e, productId) => {
        e.dataTransfer.setData('text/plain', productId);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetId) => {
        e.preventDefault();
        const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
        const updatedProducts = [...products];
        const draggedIndex = updatedProducts.findIndex(p => p.id === draggedId);
        const targetIndex = updatedProducts.findIndex(p => p.id === targetId);
        
        const [draggedProduct] = updatedProducts.splice(draggedIndex, 1);
        updatedProducts.splice(targetIndex, 0, draggedProduct);
        
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={() => setIsAuthenticated(false)}>Logout</button>
            </div>

            <div className="admin-content">
                <div className="product-form">
                    <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                    <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            required
                        />
                        <select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Unisex">Unisex</option>
                        </select>
                        <button type="submit">
                            {editingProduct ? 'Update Product' : 'Add Product'}
                        </button>
                        {editingProduct && (
                            <button type="button" onClick={() => {
                                setEditingProduct(null);
                                setNewProduct({
                                    name: '',
                                    price: '',
                                    description: '',
                                    image: '',
                                    category: 'Men'
                                });
                            }}>
                                Cancel
                            </button>
                        )}
                    </form>
                </div>

                <div className="products-list">
                    <h2>Products</h2>
                    <div className="products-grid">
                        {products.map(product => (
                            <div
                                key={product.id}
                                className="product-item"
                                draggable
                                onDragStart={(e) => handleDragStart(e, product.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, product.id)}
                            >
                                <img src={product.image} alt={product.name} />
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>${product.price}</p>
                                    <p>{product.category}</p>
                                </div>
                                <div className="product-actions">
                                    <button onClick={() => handleEditProduct(product)}>Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin; 