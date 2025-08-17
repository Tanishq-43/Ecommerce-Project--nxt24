document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update cart count
    updateCartCount();
    
    // Quantity change handlers
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
            const isIncrease = this.classList.contains('increase');
            updateQuantity(productId, isIncrease);
        });
    });
    
    // Remove item handlers
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.closest('.cart-item').getAttribute('data-id'));
            removeItem(productId);
        });
    });
});

function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBody = document.querySelector('.cart-body');
    const subtotalElement = document.querySelector('.subtotal');
    const shippingElement = document.querySelector('.shipping');
    const taxElement = document.querySelector('.tax');
    const totalElement = document.querySelector('.total-amount');
    
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="products.html" class="btn">Continue Shopping</a>
            </div>
        `;
        subtotalElement.textContent = '$0.00';
        shippingElement.textContent = '$0.00';
        taxElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        return;
    }
    
    cartBody.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.id);
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
            </div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="quantity-control">
                <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            <div class="remove-item"><i class="fas fa-trash"></i></div>
        `;
        cartBody.appendChild(cartItem);
    });
    
    const shipping = 5.00;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(productId, isIncrease) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (isIncrease) {
            item.quantity += 1;
        } else {
            item.quantity = Math.max(1, item.quantity - 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}