# Frontend Mentor - Product List with Cart Solution

This is my solution to the **Product List with Cart challenge** on Frontend Mentor.  
The goal was to build a responsive product listing page where users can add products to a cart, adjust quantities, and confirm orders with a fully interactive interface.

---

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Links](#links)
- [Built with](#built-with)
- [What I learned](#what-i-learned)
- [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## Overview

Users can:

- Browse products with images, names, and prices  
- Add items to a cart  
- Increase or decrease quantities  
- Confirm orders via a modal  
- Reset selections to start a new order  
- Experience a responsive layout for mobile, tablet, and desktop  

All functionality is handled with **vanilla JavaScript**.

---

## Screenshots

### Desktop
![Desktop Screenshot](./screenshot.jpg)

### Mobile
![Mobile Screenshot](./screenshot.jpg)

---

## Links

**Live Site:** [https://freedev-group.github.io/Product_List_with_Cart_Evelyne/](https://freedev-group.github.io/Product_List_with_Cart_Evelyne/)  
**Frontend Mentor Solution:** (Add your link if available)

---

## Built with

- HTML5, CSS3  
- Flexbox & CSS Grid  
- Mobile-first workflow  
- Vanilla JavaScript  

---

## What I learned

- Managing **state** with JavaScript variables  
- Dynamically updating the **DOM**  
- Building a **responsive layout** with Flexbox & Grid  
- Handling **click events** for increment, decrement, and modal interactions  

Example:

```javascript
function incrementQuantity(id) {
  const item = cartItems.find(product => product.id === id);
  item.quantity += 1;
  updateCartDOM();
}
## Continued development

In future projects I want to continue improving:

- My **JavaScript architecture** for better state management  
- Adding **animations and micro-interactions** to enhance UX  
- Creating **reusable UI components**  
- Exploring modern frameworks like **React** to handle dynamic interfaces more efficiently  

---

## AI Collaboration

During this project I used **ChatGPT** as a learning assistant.  

It helped me with:

- Brainstorming the cart logic  
- Debugging JavaScript functions  
- Understanding dynamic DOM updates  
- Structuring the README and project documentation  

---

## Author

**Evelyne Mukasa**  

Frontend Mentor: [https://www.frontendmentor.io/profile/evelynmukasa](https://www.frontendmentor.io/profile/evelynmukasa)  
Live Project: [https://freedev-group.github.io/Product_List_with_Cart_Evelyne/](https://freedev-group.github.io/Product_List_with_Cart_Evelyne/)

---

## Acknowledgments

I want to thank **Frontend Mentor** for providing this challenge, which helped me improve my DOM manipulation and JavaScript skills.  
