// Sample product data (in a real app, this would come from an API)
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        oldPrice: 129.99,
        image: "images/products/headphones.jpg",
        rating: 4,
        category: "electronics"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        oldPrice: 249.99,
        image: "images/products/smartwatch.jpg",
        rating: 5,
        category: "electronics"
    },
    // Add more products...
];

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Filter functionality
    document.getElementById('category').addEventListener('change', filterProducts);
    document.getElementById('sort').addEventListener('change', sortProducts);
});

function loadProducts(filteredProducts = products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toFixed(2)} 
                    <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
                </div>
                <div class="rating">
                    ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                </div>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });
}

function filterProducts() {
    const category = document.getElementById('category').value;
    let filteredProducts = products;
    
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }
    
    loadProducts(filteredProducts);
}

function sortProducts() {
    const sortBy = document.getElementById('sort').value;
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    loadProducts(sortedProducts);
}

// Cart functions
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    alert(`${product.name} added to cart!`);
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}