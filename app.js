const searchPrducts=()=>{

    fetch("https://mahi-b-rahaman.github.io/GearQuest_API/GearQuest.json")
        .then(res=>res.json())
        .then(data=>showDetails(data))

}

searchPrducts()


const showDetails=(products)=>{

    products.forEach(element => {
        console.log(element)
        const div=document.createElement("div")
        div.innerHTML=`
        <div class="bg-black/90 backdrop-blur-sm p-6 rounded-xl shadow-xl flex flex-col h-[500px] transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 group">
            <div class="relative overflow-hidden rounded-lg mb-4">
                <img src="${element.image}"
                    alt="${element.name}" class="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-110">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 class="text-xl font-semibold text-red-500 mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">${element.name}</h3>
            <p class="text-gray-400 mb-4 line-clamp-3 flex-grow group-hover:text-gray-300 transition-colors">${element.description}</p>
            <div class="mt-auto">
                <p class="text-lg text-white mb-4 font-bold">$ ${element.price}</p>
                <button onclick="addToCart(${JSON.stringify(element).replace(/"/g, '&quot;')})" 
                        class="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg transition-all duration-300 
                               transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    Add to Cart
                </button>
            </div>
        </div>
        `
        const details= document.getElementById("display-card")
        details.appendChild(div)
    });

}

// Store the timeout ID for the notification
let cartNotificationTimeout;

// Add to cart functionality
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show notification
    showCartNotification(product.name);
    
    // Update cart count
    updateCartCount();
}

// Show cart notification
function showCartNotification(productName) {
    const notification = document.getElementById('cartNotification');
    const notificationText = document.getElementById('cartNotificationText');
    
    if (!notification || !notificationText) return;
    
    notificationText.textContent = `${productName} added to cart!`;
    notification.style.transform = 'translateX(0)';
    
    // Clear any existing timeout
    if (cartNotificationTimeout) {
        clearTimeout(cartNotificationTimeout);
    }
    // Set a new timeout
    cartNotificationTimeout = setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    }, 3000);
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById('cartCount');
    
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Initialize cart count when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

/*
let count =0;
const addToCard=(id,price)=>{
    count=count+1;
    console.log(price)
    document.getElementById('total-products').innerHTML=count;
    updatePrice(price)
    total()
}

const updatePrice=(price)=>{

    const oldPrice=document.getElementById('price').innerText;
    const oldPriceFloat=parseFloat(oldPrice);
    const floatprice=parseFloat(price)
    const newPrice=floatprice+oldPriceFloat;
    console.log(oldPriceFloat,floatprice)

    document.getElementById('price').innerText=newPrice.toFixed(2)

    DeliveryCharge(newPrice)



}

const DeliveryCharge=(newPrice)=>{
    let DeliveryCharge;
    if(newPrice<=500) {
        return document.getElementById('delivery-charge').innerText=0;
    }
    if(newPrice>500 && newPrice<800){
        document.getElementById('delivery-charge').innerText=50
    }
    else if(newPrice>=800)
    {
        document.getElementById('delivery-charge').innerText=100
    }


}

const total=()=>{
    const price=parseFloat(document.getElementById('price').innerText);
    const deliver=parseFloat(document.getElementById('delivery-charge').innerText);
    const total=price+deliver;
    document.getElementById('total').innerText=total

}


const ratings=(rate)=>{
    if(rate>=4){
        return star=` <h3><i class="fas fa-star text-orange-500"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`
    }
    else if(rate>=3 && rate<4)
    {
        return star=` <h3><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`
    }
    else if(rate>=2 && rate<3){
        return star=` <h3><i class="fas fa-star"></i><i class="fas fa-star"></i> ${rate}</h3>`
    }
    else{
        return star=` <h3><i class="fas fa-star"></i> ${rate}</h3>`
    }

}*/


const orderProducts=()=>{
    const details=document.getElementById('details');
    details.textContent='';
    const totalPrice=document.getElementById('total').innerText;
    // if(totalPrice>=500){
    //   return document.getElementById('tax').innerText=100;
    // }
    // else if(totalPrice<500){
    //   return document.getElementById('tax').innerText=200;
    // }
    const div=document.createElement('div');
    div.classList.add('shopping')
    div.innerHTML=`<h4>Your total Shopping : $${totalPrice}</h4>
    <p>Thanks for Shopping With Us!!!!!</p>
   
  
    `

    details.appendChild(div)
}
  