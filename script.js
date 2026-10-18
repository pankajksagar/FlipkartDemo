
"use strict";

// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 1499,
        oldPrice: 2999,
        rating: 4.3,
        discount: 50,
        description: "Wireless sound with deep bass",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Smartphone",
        category: "Electronics",
        price: 12999,
        oldPrice: 16999,
        rating: 4.5,
        discount: 24,
        description: "Powerful performance and camera",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Classic Sports Shoes",
        category: "Fashion",
        price: 1799,
        oldPrice: 3599,
        rating: 4.2,
        discount: 50,
        description: "Comfortable shoes for everyday use",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Stylish Wrist Watch",
        category: "Fashion",
        price: 999,
        oldPrice: 1999,
        rating: 4.1,
        discount: 50,
        description: "Modern design for every occasion",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Modern Table Lamp",
        category: "Home",
        price: 799,
        oldPrice: 1299,
        rating: 4.4,
        discount: 38,
        description: "Elegant lighting for your room",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Comfortable Sofa",
        category: "Home",
        price: 14999,
        oldPrice: 21999,
        rating: 4.6,
        discount: 32,
        description: "A cozy addition to your living room",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Electric Coffee Maker",
        category: "Appliances",
        price: 2499,
        oldPrice: 3999,
        rating: 4.2,
        discount: 38,
        description: "Enjoy freshly brewed coffee",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        name: "Digital Camera",
        category: "Electronics",
        price: 18999,
        oldPrice: 24999,
        rating: 4.5,
        discount: 24,
        description: "Capture your favorite moments",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        name: "Bestselling Novel",
        category: "Books",
        price: 349,
        oldPrice: 499,
        rating: 4.7,
        discount: 30,
        description: "An exciting book for your collection",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        name: "Skincare Essentials",
        category: "Beauty",
        price: 599,
        oldPrice: 899,
        rating: 4.3,
        discount: 33,
        description: "Everyday skincare essentials",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        name: "Cotton Casual T-Shirt",
        category: "Fashion",
        price: 499,
        oldPrice: 799,
        rating: 4.1,
        discount: 38,
        description: "Soft fabric and a relaxed fit",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        name: "Portable Bluetooth Speaker",
        category: "Electronics",
        price: 1199,
        oldPrice: 1999,
        rating: 4.4,
        discount: 40,
        description: "Portable speaker with rich sound",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80"
    }
];

// Application state
let cart = [];
let activeCategory = "All";
let searchQuery = "";
let toastTimeout;

// HTML elements
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsInfo = document.getElementById("resultsInfo");
const emptyMessage = document.getElementById("emptyMessage");

const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const toast = document.getElementById("toast");

// Format prices in Indian Rupees
function formatPrice(amount) {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    });
}

// Show a temporary notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Filter products using category and search query
function getFilteredProducts() {
    return products.filter(product => {
        const matchesCategory =
            activeCategory === "All" ||
            product.category === activeCategory;

        const searchableText = (
            product.name + " " +
            product.category + " " +
            product.description
        ).toLowerCase();

        const matchesSearch = searchableText.includes(
            searchQuery.toLowerCase().trim()
        );

        return matchesCategory && matchesSearch;
    });
}

// Display product cards
function renderProducts() {
    const filteredProducts = getFilteredProducts();

    productGrid.replaceChildren();

    resultsInfo.textContent =
        `Showing ${filteredProducts.length} of ${products.length} products`;

    emptyMessage.hidden = filteredProducts.length !== 0;

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <span class="discount-badge">
                    ${product.discount}% OFF
                </span>
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy">
            </div>

            <div class="product-details">
                <h3 class="product-name"></h3>

                <p class="product-description"></p>

                <span class="rating">
                    ★ ${product.rating}
                </span>

                <div class="price-row">
                    <span class="price">
                        ${formatPrice(product.price)}
                    </span>

                    <span class="old-price">
                        ${formatPrice(product.oldPrice)}
                    </span>

                    <span class="price-discount">
                        ${product.discount}% off
                    </span>
                </div>

                <button class="add-cart-btn" data-id="${product.id}">
                    Add to Cart 🛒
                </button>
            </div>
        `;

        // Use textContent for product text
        card.querySelector(".product-name").textContent = product.name;
        card.querySelector(".product-description").textContent =
            product.description;

        // Show a fallback if an image fails to load
        const image = card.querySelector("img");

        image.addEventListener("error", () => {
            image.alt = `${product.name} image unavailable`;
            image.style.visibility = "hidden";
        }, { once: true });

        productGrid.appendChild(card);
    });
}

// Update the active category style
function setActiveCategory(category) {
    activeCategory = category;

    document.querySelectorAll(".category-item").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.category === category
        );
    });

    renderProducts();
}

// Search products
function performSearch() {
    searchQuery = searchInput.value.trim();
    renderProducts();

    document.getElementById("products").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

searchBtn.addEventListener("click", performSearch);

searchInput.addEventListener("input", () => {
    searchQuery = searchInput.value.trim();
    renderProducts();
});

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        performSearch();
    }
});

// Category filtering
document.querySelectorAll(".category-item").forEach(button => {
    button.addEventListener("click", () => {
        setActiveCategory(button.dataset.category);
    });
});

// Reset search and category filters
function resetFilters() {
    searchQuery = "";
    searchInput.value = "";

    setActiveCategory("All");
}

document.getElementById("clearFilters").addEventListener(
    "click",
    resetFilters
);

document.getElementById("resetSearch").addEventListener(
    "click",
    resetFilters
);

document.getElementById("shopNowBtn").addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

// Add products to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    renderCart();
    showToast(`${product.name} added to cart!`);
}

// Event delegation for Add to Cart
productGrid.addEventListener("click", event => {
    const button = event.target.closest(".add-cart-btn");

    if (!button) return;

    addToCart(Number(button.dataset.id));
});

// Render shopping cart
function renderCart() {
    cartItems.replaceChildren();

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);
    checkoutBtn.disabled = cart.length === 0;

    if (cart.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-cart";
        message.textContent = "Your cart is empty.";
        cartItems.appendChild(message);
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="">

            <div class="cart-item-info">
                <h4></h4>
                <p>${formatPrice(item.price * item.quantity)}</p>

                <div class="quantity-controls">
                    <button data-action="decrease"
                            data-id="${item.id}"
                            aria-label="Decrease quantity">−</button>

                    <span>${item.quantity}</span>

                    <button data-action="increase"
                            data-id="${item.id}"
                            aria-label="Increase quantity">+</button>

                    <button data-action="remove"
                            data-id="${item.id}"
                            class="remove-btn">Remove</button>
                </div>
            </div>
        `;

        cartItem.querySelector("h4").textContent = item.name;
        cartItems.appendChild(cartItem);
    });
}

// Change quantity or remove a cart item
cartItems.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const productId = Number(button.dataset.id);
    const action = button.dataset.action;

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    if (action === "increase") {
        item.quantity += 1;
    } else if (action === "decrease") {
        item.quantity -= 1;

        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== productId);
        }
    } else if (action === "remove") {
        cart = cart.filter(product => product.id !== productId);
    }

    renderCart();
});

// Open and close the cart
function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("show");
    document.body.style.overflow = "";
}

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Demo checkout
checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty.");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    showToast(
        `Demo checkout: your order total is ${formatPrice(total)}.`
    );

    // No real order or payment is created.
});

// Demo login
loginBtn.addEventListener("click", () => {
    loginModal.hidden = false;
    document.getElementById("userName").focus();
});

document.getElementById("closeLogin").addEventListener("click", () => {
    loginModal.hidden = true;
});

loginModal.addEventListener("click", event => {
    if (event.target === loginModal) {
        loginModal.hidden = true;
    }
});

document.getElementById("loginForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("userName").value.trim();

    if (!name) {
        showToast("Please enter your name.");
        return;
    }

    // Safely display the entered name
    loginBtn.textContent = name.length > 14
        ? name.slice(0, 12) + "…"
        : name;

    loginModal.hidden = true;
    showToast(`Welcome, ${name}!`);
});

// Close overlays with Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCart();
        loginModal.hidden = true;
    }
});

// Initial page setup
renderProducts();
renderCart();
