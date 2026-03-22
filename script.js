async function loadProduct() {
    const response =await fetch("data.json");
    const products=await response.json();

    const grid = document.getElementById("product-grid");

    products.forEach(product => {
        const card =document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML =`
    <div class="product-card">
        <div class="product-img-wrapper">
            <picture>
                <source srcset="${product.image.desktop}" media="(min-width: 1440px)">
                <source srcset="${product.image.tablet} media="(min-width: 768px)">
                <img src="${product.image.mobile}" alt="${product.name}">
            </picture>
        </div>
        <div class="product-description">
            <div class="add-to-cart">
            <button class="add-to-cart-button">Add to Cart</button>
            <div class="quantity-control">
                <button class="button-decrement"><img src="assets/images/icon-decrement-quantity.svg" alt=""></button>
                <button class="button-increment"><img src="assets/images/icon-increment-quantity.svg" alt=""></button>
            </div>
            </div>
            <h6 class="product-categorie">${product.category}</h6>
            <h4 class="product-name">${product.name}</h4>
            <h5 class="product-price">$${product.price.toFixed(2)}</h5>
        </div>
    </div>
        `;
        grid.appendChild(card);     
    });  
}
loadProduct();