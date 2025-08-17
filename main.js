// Featured Products Data
const featuredProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        oldPrice: 129.99,
        image: "images/products/headphones.jpg",
        rating: 4
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        oldPrice: 249.99,
        image: "images/products/smartwatch.jpg",
        rating: 5
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        oldPrice: 99.99,
        image: "images/products/speaker.jpg",
        rating: 4
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 49.99,
        oldPrice: 59.99,
        image: "images/products/backpack.jpg",
        rating: 3
    }
];

// Load featured products
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.querySelector('.products-grid');
    
    featuredProducts.forEach(product => {
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

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const product = featuredProducts.find(p => p.id == productId);
            addToCart(product);
        });
    });
});

// Cart functionality
let cart = [];

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
    
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}