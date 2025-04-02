import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        category: 'perfumes'
    });
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [activeTab, setActiveTab] = useState('products');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [analytics, setAnalytics] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0
    });

    useEffect(() => {
        // Load products and orders from localStorage
        const savedProducts = localStorage.getItem('products');
        const savedOrders = localStorage.getItem('orders');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        }
        if (savedOrders) {
            const parsedOrders = JSON.parse(savedOrders);
            setOrders(parsedOrders);
            calculateAnalytics(parsedOrders);
        }
    }, []);

    const calculateAnalytics = (ordersData) => {
        const totalProducts = products.length;
        const totalOrders = products.reduce((sum, product) => sum + (product.orders || 0), 0);
        const totalRevenue = products.reduce((sum, product) => sum + (product.revenue || 0), 0);
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        setAnalytics({
            totalProducts,
            totalOrders,
            totalRevenue,
            averageOrderValue
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCredentials({ username: '', password: '' });
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const product = {
            ...newProduct,
            id: Date.now(),
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock)
        };
        const updatedProducts = [...products, product];
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setNewProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            category: 'perfumes',
            stock: 0
        });
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setNewProduct({
            name: product.name,
            price: product.price.toString(),
            description: product.description,
            image: product.image,
            category: product.category,
            stock: product.stock
        });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const updatedProducts = products.map(product =>
            product.id === editingProduct.id
                ? { ...newProduct, id: product.id, price: parseFloat(newProduct.price), stock: parseInt(newProduct.stock) }
                : product
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setEditingProduct(null);
        setNewProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            category: 'perfumes',
            stock: 0
        });
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
            const updatedProducts = products.filter(product => !selectedProducts.includes(product.id));
            setProducts(updatedProducts);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
            setSelectedProducts([]);
        }
    };

    const handleOrderStatusUpdate = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        calculateAnalytics(updatedOrders);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const newProducts = [...products];
        const [removed] = newProducts.splice(dragIndex, 1);
        newProducts.splice(dropIndex, 0, removed);
        setProducts(newProducts);
        localStorage.setItem('products', JSON.stringify(newProducts));
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div className="admin-tabs">
                <button 
                    className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
                <button 
                    className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => setActiveTab('orders')}
                >
                    Orders
                </button>
                <button 
                    className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    Analytics
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'products' && (
                    <>
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
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
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
                                            category: 'perfumes',
                                            stock: 0
                                        });
                                    }}>
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </div>

                        <div className="products-list">
                            <div className="products-header">
                                <h2>Products</h2>
                                <div className="products-actions">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="search-input"
                                    />
                                    {selectedProducts.length > 0 && (
                                        <button onClick={handleBulkDelete} className="bulk-delete-btn">
                                            Delete Selected ({selectedProducts.length})
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="products-grid">
                                {filteredProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className={`product-item ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDrop(e, index)}
                                    >
                                        <div className="product-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelectedProducts([...selectedProducts, product.id]);
                                                    } else {
                                                        setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                                                    }
                                                }}
                                            />
                                        </div>
                                        <img src={product.image} alt={product.name} />
                                        <div className="product-info">
                                            <h3>{product.name}</h3>
                                            <p>${product.price}</p>
                                            <p>Stock: {product.stock}</p>
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="product-actions">
                                            <button onClick={() => handleEditProduct(product)}>Edit</button>
                                            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-list">
                        <h2>Orders</h2>
                        <div className="orders-grid">
                            {orders.map(order => (
                                <div key={order.id} className="order-item">
                                    <div className="order-header">
                                        <h3>Order #{order.id}</h3>
                                        <span className={`order-status ${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="order-details">
                                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                                        <p>Total: ${order.total}</p>
                                        <div className="order-items">
                                            {order.items.map(item => (
                                                <div key={item.id} className="order-item-product">
                                                    <img src={item.image} alt={item.name} />
                                                    <div>
                                                        <p>{item.name}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                        <p>${item.price}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="order-actions">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="analytics-dashboard">
                        <div className="analytics-grid">
                            <div className="analytics-card">
                                <h3>Total Products</h3>
                                <p className="analytics-value">{analytics.totalProducts}</p>
                            </div>
                            <div className="analytics-card">
                                <h3>Total Orders</h3>
                                <p className="analytics-value">{analytics.totalOrders}</p>
                            </div>
                            <div className="analytics-card">
                                <h3>Total Revenue</h3>
                                <p className="analytics-value">${analytics.totalRevenue.toFixed(2)}</p>
                            </div>
                            <div className="analytics-card">
                                <h3>Average Order Value</h3>
                                <p className="analytics-value">${analytics.averageOrderValue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin; 