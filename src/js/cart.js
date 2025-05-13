// Cart data structure
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let appliedVoucher = null;

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="bg-black p-6 rounded-lg shadow-lg text-center">
                <p class="text-gray-400 text-lg">Your cart is empty</p>
                <a href="../../index.html" class="inline-block mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-lg transition">
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

// Apply voucher
function applyVoucher() {
    const voucherInput = document.getElementById('voucherInput');
    const voucherMessage = document.getElementById('voucherMessage');
    const voucher = voucherInput.value.trim().toUpperCase();

    if (voucher === 'GEAR15') {
        appliedVoucher = voucher;
        localStorage.setItem('appliedVoucher', voucher);
        voucherMessage.textContent = '15% off voucher applied successfully!';
        voucherMessage.className = 'text-sm mt-2 text-green-500';
        updateOrderSummary();
    } else {
        appliedVoucher = null;
        localStorage.removeItem('appliedVoucher');
        voucherMessage.textContent = 'Invalid voucher code';
        voucherMessage.className = 'text-sm mt-2 text-red-500';
        updateOrderSummary();
    }
}

// Update order summary
function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let shipping;
    if (subtotal > 0) {
        if (subtotal > 500) {
            shipping = 0;
        } else {
            shipping = 50;
        }
    } else {
        shipping = 0;
    }
    const tax = subtotal * 0.1; // 10% tax
    
    // Calculate discount if voucher is applied
    let discount = 0;
    if (appliedVoucher === 'GEAR15') {
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
        showToast('Your cart is empty!', 'error');
        return;
    }

    // Show thank you modal
    const modal = document.getElementById('thankYouModal');
    const modalTotal = document.getElementById('modalTotal');
    const modalItems = document.getElementById('modalItems');

    // Update modal content
    modalTotal.textContent = document.getElementById('total').textContent;
    modalItems.textContent = cart.length + ' item' + (cart.length > 1 ? 's' : '');

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateOrderSummary();
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    window.location.href = '../../index.html';
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Load any existing voucher
    appliedVoucher = localStorage.getItem('appliedVoucher');
    if (appliedVoucher) {
        document.getElementById('voucherInput').value = appliedVoucher;
        document.getElementById('voucherMessage').textContent = '15% off voucher applied successfully!';
        document.getElementById('voucherMessage').className = 'text-sm mt-2 text-green-500';
    }
    
    updateCartDisplay();
}); 