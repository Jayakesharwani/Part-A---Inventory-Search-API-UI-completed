const API_URL = "http://localhost:5000/search";

let debounceTimer; 

function loadFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("searchInput").value = params.get("q") || "";
  document.getElementById("category").value = params.get("category") || "All";
  document.getElementById("minPrice").value = params.get("minPrice") || "";
  document.getElementById("maxPrice").value = params.get("maxPrice") || "";
}


function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("category").value = "All";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";

  const status = document.getElementById("status");
  const tableBody = document.querySelector("#resultsTable tbody");

  status.innerText = "Filters cleared.";
  status.className = "status-success";

  tableBody.innerHTML = ""; 

  window.history.pushState({}, "", window.location.pathname);
}

function debounceFetch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fetchResults, 500);
} 

document.getElementById("searchInput").addEventListener("input", debounceFetch); 
document.getElementById("minPrice").addEventListener("wheel", e => e.target.blur());
document.getElementById("maxPrice").addEventListener("wheel", e => e.target.blur());

async function fetchResults() {
  const q = document.getElementById("searchInput").value;
  const category = document.getElementById("category").value;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;

  const status = document.getElementById("status");
  const tableBody = document.querySelector("#resultsTable tbody");

  tableBody.innerHTML = "";
 
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    status.className = "status-error";
    status.innerText = "Invalid price range: Min price cannot be greater than max price";
    return;
  }

  status.className = "status-loading";
  status.innerHTML = `<div class="loader"></div>`;

  try {
    const params = new URLSearchParams();

    if (q) params.append("q", q);
    if (category && category !== "All") params.append("category", category);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice); 

    const queryString = params.toString();
const newUrl = queryString ? `?${queryString}` : window.location.pathname;

window.history.pushState({}, "", newUrl);

    const response = await fetch(`${API_URL}?${params.toString()}`);

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    const data = await response.json();

   
    if (data.length === 0) {
      status.className = "status-error";
      status.innerText = "No results found";
      return;
    }
 
    status.className = "status-success";
    status.innerText = `${data.length} results found`;

    data.forEach(item => {
      const row = `
        <tr>
          <td>${item.productName}</td>
          <td>${item.category}</td>
          <td>₹${item.price}</td>
          <td>${item.supplier}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });

  } catch (error) {
    status.className = "status-error";
    status.innerText = error.message;
  }
}

window.onload = () => {
  loadFiltersFromURL();
  fetchResults();
};