export const initializeProducts = () => {
    const existingProducts = localStorage.getItem('products');
    if (!existingProducts) {
        const sampleProducts = [
            {
                id: 1,
                name: "Ocean Breeze",
                price: 49.99,
                category: "women",
                image: "/winy.jpg",
                description: "A fresh and light fragrance perfect for summer days."
            },
            {
                id: 2,
                name: "Midnight Mystery",
                price: 59.99,
                category: "men",
                image: "/winy.jpg",
                description: "A sophisticated scent for the modern gentleman."
            },
            {
                id: 3,
                name: "Luxury Gift Set",
                price: 89.99,
                category: "gifts",
                image: "/winy.jpg",
                description: "A perfect gift set containing our best-selling fragrances."
            }
        ];
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
}; 