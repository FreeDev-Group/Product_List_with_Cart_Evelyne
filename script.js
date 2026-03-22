
let products = [];
let cart = {};

async function init() {
  const res = await fetch("data.json");
  products = await res.json();
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById("product-grid");

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-img-wrapper">
        <picture>
          <source srcset="${product.image.desktop}" media="(min-width:1024px)">
          <source srcset="${product.image.tablet}" media="(min-width:768px)">
          <img src="${product.image.mobile}" alt="${product.name}">
        </picture>
      </div>
      <div class="product-description">
        <div class="add-to-cart">
          <button class="add-btn"> <img src="assets/images/icon-add-to-cart.svg" alt="">Add to Cart</button>
          <div class="quantity-control">
            <button class="decrement"><img src="assets/images/icon-decrement-quantity.svg" alt="imagedecrement"></button>
            <span class="quantity">1</span>
            <button class="increment"><img src="assets/images/icon-increment-quantity.svg" alt="imageincrement"></button>
          </div>
        </div>
        <h6>${product.category}</h6>
        <h4>${product.name}</h4>
        <h5>$${product.price.toFixed(2)}</h5>
      </div>
    `;

    const container = card.querySelector(".add-to-cart");
    const addBtn = card.querySelector(".add-btn");
    const qtyControl = card.querySelector(".quantity-control");
    const incrementBtn = card.querySelector(".increment");
    const decrementBtn = card.querySelector(".decrement");
    const qtyDisplay = card.querySelector(".quantity");

    qtyControl.style.display = "none";

    container.addEventListener("mouseenter", () => {
      if (cart[index]) container.classList.add("active");
    });
    container.addEventListener("mouseleave", () => {
      container.classList.remove("active");
      updateButtons();
    });

    addBtn.addEventListener("click", () => {
      cart[index] = { ...product, quantity: 1 };
      updateUI();
    });

    incrementBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      cart[index].quantity++;
      updateUI();
    });

    decrementBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      cart[index].quantity--;
      if (cart[index].quantity <= 0) delete cart[index];
      updateUI();
    });

    grid.appendChild(card);
  });
}

function updateUI() {
  updateButtons();
  updateCart();
}

function updateButtons() {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card, index) => {
    const addBtn = card.querySelector(".add-btn");
    const qtyControl = card.querySelector(".quantity-control");
    const qtyDisplay = card.querySelector(".quantity");
    const addToCart =card.querySelector(".add-to-cart")

    if (cart[index]) {
      addBtn.style.display = "none";
      addToCart.style.backgroundColor="var(--Red)";
      addToCart.style.padding="10px"
      qtyControl.style.display = "flex";
      qtyDisplay.textContent = cart[index].quantity;
    } else {
      addBtn.style.display = "flex";
      qtyControl.style.display = "none";
      addToCart.style.backgroundColor="#fff";
      addToCart.style.padding="10px 25px"
      qtyDisplay.textContent = "1";
    }
  });
}

function updateCart() {
  const cartList = document.querySelector(".cart-items");
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.querySelector(".cart-total");
  const emptyContainer = document.querySelector(".cart-empty");
  const carbonText = document.querySelector(".cart-carbon");
  const confirmBtn = document.querySelector(".cart-confirm");
  const totalContainer = document.querySelector(".cart-total-container");

  cartList.innerHTML = "";

  let total = 0;
  let count = 0;

  Object.entries(cart).forEach(([index, item]) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-quantity">${item.quantity}x </span>
      <span class="item-unit-price">@$${item.price.toFixed(2)}</span>
      <span class="item-total-price">$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="delete-item" data-index="${index}">&times;</button>
    `;

    li.querySelector(".delete-item").addEventListener("click", () => {
      delete cart[index];
      updateUI();
    });

    cartList.appendChild(li);
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);

  if (count === 0) {
    emptyContainer.style.display = "block";
    cartList.style.display = "none";
    totalContainer.style.display = "none";
    carbonText.style.display = "none";
    confirmBtn.style.display = "none";
  } else {
    emptyContainer.style.display = "none";
    cartList.style.display = "block";
    totalContainer.style.display = "block";
    carbonText.style.display = "block";
    confirmBtn.style.display = "block";
  }
}

init();
