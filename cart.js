// Cart data structure
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedCoupon = null;

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="bg-black p-6 rounded-lg shadow-lg text-center">
                <p class="text-gray-400 text-lg">Your cart is empty</p>
                <a href="index.html" class="inline-block mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-lg transition">
                    Continue Shopping
                </a>
            </div>
        `;
        updateOrderSummary(0);
        return;
    }

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'bg-black p-6 rounded-lg shadow-lg flex items-center gap-4';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
            <div class="flex-grow">
                <h3 class="text-xl font-semibold text-red-500">${item.name}</h3>
                <p class="text-gray-400 line-clamp-2">${item.description}</p>
                <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-2">
                        <button onclick="updateQuantity(${index}, -1)" class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full">-</button>
                        <span class="text-white">${item.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)" class="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full">+</button>
                    </div>
                    <div class="text-right">
                        <p class="text-white text-lg">$${(item.price * item.quantity).toFixed(2)}</p>
                        <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-400 text-sm">Remove</button>
                    </div>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    updateOrderSummary();
}

// Update item quantity
function updateQuantity(index, change) {
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    saveCart();
    updateCartDisplay();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Apply coupon
function applyCoupon() {
    const couponInput = document.getElementById('couponInput');
    const couponMessage = document.getElementById('couponMessage');
    const coupon = couponInput.value.trim().toUpperCase();

    if (coupon === 'NAZIM15') {
        appliedCoupon = coupon;
        localStorage.setItem('appliedCoupon', coupon);
        couponMessage.textContent = '15% off Coupon applied successfully!';
        couponMessage.className = 'text-sm mt-2 text-green-500';
        updateOrderSummary();
    } else {
        appliedCoupon = null;
        localStorage.removeItem('appliedCoupon');
        couponMessage.textContent = 'Invalid coupon code';
        couponMessage.className = 'text-sm mt-2 text-red-500';
        updateOrderSummary();
    }
}

// Update order summary
function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 500 ? 0 : 50) : 0;
    const tax = subtotal * 0.1; // 10% tax
    
    // Calculate discount if coupon is applied
    let discount = 0;
    if (appliedCoupon === 'NAZIM15') {
        discount = subtotal * 0.15; // 15% discount
    }
    
    const total = subtotal + shipping + tax - discount;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('discount').textContent = `$${discount.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Here you would typically redirect to a checkout page or show a checkout modal
    alert('Proceeding to checkout...');
    // For now, we'll just clear the cart
    cart = [];
    appliedCoupon = null;
    localStorage.removeItem('appliedCoupon');
    saveCart();
    updateCartDisplay();
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Clear any existing coupon
    localStorage.removeItem('appliedCoupon');
    document.getElementById('couponInput').value = '';
    document.getElementById('couponMessage').textContent = '';
    
    updateCartDisplay();
}); 