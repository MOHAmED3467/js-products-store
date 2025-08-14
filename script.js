const productsContainer = document.getElementById("products");
const paginationContainer = document.getElementById("pagination");

let products = [];
let currentPage = 1;
const productsPerPage = 8;

// Fetch products from API
async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  products = data.products;
  displayProductsPaginated();
  setupPagination();
}

// Display products with pagination
function displayProductsPaginated() {
  productsContainer.innerHTML = "";

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToShow = products.slice(start, end);

  productsToShow.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.animationDelay = `${index * 0.05}s`;
    card.innerHTML = `
      <img class="product-img" src="${p.thumbnail}" alt="${p.title}">
      <div class="card-content">
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <p class="price">$${p.price}</p>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

// Create pagination buttons
function setupPagination() {
  paginationContainer.innerHTML = "";
  const totalPages = Math.ceil(products.length / productsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayProductsPaginated();
      setupPagination();
    });
    paginationContainer.appendChild(btn);
  }
}

fetchProducts();
