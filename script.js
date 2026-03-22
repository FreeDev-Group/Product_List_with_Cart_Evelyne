let products = [];
let cart = {};

async function init(){
  const res = await fetch("data.json");
  products = await res.json();
  renderProducts();
}

function renderProducts(){
  const grid = document.getElementById("product-grid");

  products.forEach((product,index)=>{
    const card=document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML=`
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
            <button class="decrement"><img src="assets/images/icon-decrement-quantity.svg" alt="decrement"></button>
            <span class="quantity">1</span>
            <button class="increment"><img src="assets/images/icon-increment-quantity.svg" alt="increment"></button>
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

    container.addEventListener("mouseenter",()=>{ if(cart[index]) container.classList.add("active"); });
    container.addEventListener("mouseleave",()=>{ container.classList.remove("active"); updateButtons(); });

    addBtn.addEventListener("click",()=>{ cart[index]={...product, quantity:1}; updateUI(); });
    incrementBtn.addEventListener("click",e=>{ e.stopPropagation(); cart[index].quantity++; animateQuantity(qtyDisplay); updateUI(); });
    decrementBtn.addEventListener("click",e=>{ e.stopPropagation(); cart[index].quantity--; if(cart[index].quantity<=0) delete cart[index]; animateQuantity(qtyDisplay); updateUI(); });

    grid.appendChild(card);
  });
}

function animateQuantity(qtyDisplay){ qtyDisplay.classList.add("update"); setTimeout(()=>qtyDisplay.classList.remove("update"),150); }

function updateUI(){ updateButtons(); updateCart(); }

function updateButtons(){
  const cards=document.querySelectorAll(".product-card");
  cards.forEach((card,index)=>{
    const addBtn = card.querySelector(".add-btn");
    const qtyControl = card.querySelector(".quantity-control");
    const qtyDisplay = card.querySelector(".quantity");
    const addToCart = card.querySelector(".add-to-cart");

    if(cart[index]){
      addBtn.style.display="none";
      addToCart.classList.add("active");
      qtyControl.style.display="flex";
      qtyDisplay.textContent = cart[index].quantity;
      addToCart.style.backgroundColor="var(--Red)";
    }else{
      addBtn.style.display="flex";
      addToCart.classList.remove("active");
      qtyControl.style.display="none";
      qtyDisplay.textContent="1";
      addToCart.style.backgroundColor="#fff";
    }
  });
}

function updateCart(){
  const cartList = document.querySelector(".cart-items");
  const cartCount = document.querySelector(".cart-count");
  const cartTotal = document.querySelector(".cart-total");
  const emptyContainer = document.querySelector(".cart-empty");
  const carbonText = document.querySelector(".cart-carbon");
  const confirmBtn = document.querySelector(".cart-confirm");
  const totalContainer = document.querySelector(".cart-total-container");

  cartList.innerHTML="";
  let total=0,count=0;

  Object.entries(cart).forEach(([index,item])=>{
    total += item.price*item.quantity;
    count += item.quantity;

    const li=document.createElement("li");
    li.innerHTML=`
      <span class="item-name">${item.name}</span>
      <span class="item-quantity">${item.quantity}x </span>
      <span class="item-unit-price">@$${item.price.toFixed(2)}</span>
      <span class="item-total-price">$${(item.price*item.quantity).toFixed(2)}</span>
      <button class="delete-item" data-index="${index}">&times;</button>
    `;
    li.querySelector(".delete-item").addEventListener("click",()=>{ delete cart[index]; updateUI(); });
    cartList.appendChild(li);
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);

  if(count===0){ emptyContainer.style.display="block"; cartList.style.display="none"; totalContainer.style.display="none"; carbonText.style.display="none"; confirmBtn.style.display="none"; }
  else{ emptyContainer.style.display="none"; cartList.style.display="block"; totalContainer.style.display="block"; carbonText.style.display="block"; confirmBtn.style.display="block"; }
}

// Modal
document.querySelector(".cart-confirm").addEventListener("click",()=>{
  if(Object.keys(cart).length===0) return;
  showOrderConfirmation(cart);
});

function showOrderConfirmation(cart){
  const modal=document.getElementById("order-modal");
  const itemsList=modal.querySelector(".modal-order-items");
  const orderTotal=modal.querySelector(".order-total-amount");
  itemsList.innerHTML="";

  let total=0;
  Object.values(cart).forEach(item=>{
    const itemTotal=item.price*item.quantity;
    total+=itemTotal;
    const li=document.createElement("li");
    li.innerHTML=`
      <img src="${item.image.thumbnail}" alt="${item.name}">
      <div class="item-info">
        <span class="item-name">${item.name}</span>
        <span class="item-quantity">${item.quantity} ×</span>
        <span class="item-unit-price">@ $${item.price.toFixed(2)}</span>
      </div>
      <span class="item-total-price">$${itemTotal.toFixed(2)}</span>
    `;
    itemsList.appendChild(li);
  });

  orderTotal.textContent=`$${total.toFixed(2)}`;
  modal.style.display="flex";

  modal.querySelector(".modal-close-btn").onclick=()=>{
    modal.style.display="none";
    cart={};
    updateUI();
  };

  modal.addEventListener("click",(e)=>{
    if(e.target===modal){ modal.style.display="none"; cart={}; updateUI(); }
  });
}

init();