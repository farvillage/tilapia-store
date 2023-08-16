// Get product elements and cart elements
const products = document.querySelectorAll('.product');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

// Initialize cart data
const cart = [];
let total = 0;

// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const productName = products[index].querySelector('.product-name').textContent;
    const productPrice = parseFloat(products[index].querySelector('.product-price').textContent.slice(1));

    // Check if the product is already in the cart
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    // Update the cart UI
    updateCartUI();

    // Recalculate and update total
    total += productPrice;
    cartTotal.textContent = `$${total.toFixed(2)}`;
  });
});

// Update the cart UI
function updateCartUI() {
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    cartItems.appendChild(li);
  });
}
