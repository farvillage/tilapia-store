let cart = JSON.parse(localStorage.getItem('cart')) || [];

function formatPrice(price) {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function addToCart(name, price) {
  const item = cart.find(product => product.name === name);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} x${product.quantity} - ${formatPrice(product.price * product.quantity)}`;
    cartItems.appendChild(li);
    total += product.price * product.quantity;
  });

  cartTotal.textContent = formatPrice(total);
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.closest('.col-lg-3');
      const name = parent.querySelector('.product-name').textContent;
      const rawPrice = parent.querySelector('.product-price').textContent.replace(/[^\d,]/g, '').replace(',', '.');
      const price = parseFloat(rawPrice);
      addToCart(name, price);
    });
  });

  renderCart();
});

console.log('cart is loaded', cart);