// scripts/Inventory.js
// Updated to use the backend REST API instead of in-memory array

const API_URL = 'http://localhost:5000/api';

// ─── DOM Elements ─────────────────────────────────────────────────────────────
const addNewBtn = document.getElementById('addNewBtn');
const popupForm = document.getElementById('popupForm');
const closePopupBtn = document.getElementById('closePopup');
const inventoryForm = document.getElementById('inventoryForm');
const invTableBody = document.getElementById('invTableBody');
const invNameInput = document.getElementById('invName');

let editId = null; // holds MongoDB _id of item being edited

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Get the JWT token stored after login
function getToken() {
  return localStorage.getItem('mbmsToken');
}

// Common fetch headers for authenticated requests
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

// Show/hide popup
function openPopup() { popupForm.style.display = 'flex'; }
function closePopup() {
  popupForm.style.display = 'none';
  inventoryForm.reset();
  editId = null;
}

// ─── Fetch All Products from API ──────────────────────────────────────────────
async function loadProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    const json = await res.json();

    if (!json.success) throw new Error(json.message);

    renderTable(json.data);
    loadAutocomplete(json.data); // also update autocomplete list
  } catch (err) {
    console.error('Failed to load products:', err.message);
    alert('Could not load inventory. Make sure the backend server is running.');
  }
}

// ─── Render Table ──────────────────────────────────────────────────────────────
function renderTable(products) {
  invTableBody.innerHTML = '';

  if (products.length === 0) {
    invTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center">No products found. Add your first product!</td></tr>';
    return;
  }

  products.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.sku}</td>
      <td>${item.quantity}</td>
      <td>₹${item.mrp.toFixed(2)}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editItem('${item._id}')">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteItem('${item._id}')">Delete</button>
      </td>
    `;
    invTableBody.appendChild(row);
  });
}

// ─── Populate Autocomplete Datalist ───────────────────────────────────────────
function loadAutocomplete(products) {
  const datalist = document.getElementById('productSuggestions');
  datalist.innerHTML = '';
  products.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.name;
    datalist.appendChild(option);
  });
}

// Auto-fill SKU and price when a product name is selected from the datalist
let _cachedProducts = [];
async function fetchAndCacheProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    const json = await res.json();
    if (json.success) _cachedProducts = json.data;
  } catch (_) {}
}

invNameInput.addEventListener('input', function () {
  const match = _cachedProducts.find(
    (p) => p.name.toLowerCase() === this.value.toLowerCase()
  );
  if (match) {
    document.getElementById('invCategory').value = match.sku;
    document.getElementById('invSell').value = match.mrp;
  }
});

// ─── Create / Update Product ───────────────────────────────────────────────────
inventoryForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const name = invNameInput.value.trim();
  const sku = document.getElementById('invCategory').value.trim();
  const quantity = parseInt(document.getElementById('invQty').value);
  const mrp = parseFloat(document.getElementById('invSell').value);

  if (!name || !sku || quantity < 0 || mrp < 0) {
    alert('Please fill in all fields with valid values!');
    return;
  }

  const productData = { name, sku, quantity, mrp };
  const token = getToken();

  try {
    let res, json;

    if (editId === null) {
      // CREATE
      res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(productData),
      });
    } else {
      // UPDATE
      res = await fetch(`${API_URL}/products/${editId}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(productData),
      });
    }

    json = await res.json();

    if (!json.success) {
      alert(`Error: ${json.message || JSON.stringify(json.errors)}`);
      return;
    }

    closePopup();
    loadProducts(); // Refresh table
  } catch (err) {
    console.error('Save failed:', err.message);
    alert('Failed to save product. Is the backend running?');
  }
});

// ─── Edit ─────────────────────────────────────────────────────────────────────
async function editItem(id) {
  try {
    const res = await fetch(`${API_URL}/products`);
    const json = await res.json();
    const item = json.data.find((p) => p._id === id);
    if (!item) return alert('Product not found');

    invNameInput.value = item.name;
    document.getElementById('invCategory').value = item.sku;
    document.getElementById('invQty').value = item.quantity;
    document.getElementById('invSell').value = item.mrp;

    editId = id;
    openPopup();
  } catch (err) {
    alert('Could not load product details.');
  }
}

// ─── Delete ───────────────────────────────────────────────────────────────────
async function deleteItem(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    const json = await res.json();

    if (!json.success) {
      alert(`Delete failed: ${json.message}`);
      return;
    }
    loadProducts();
  } catch (err) {
    alert('Delete failed. Is the backend running?');
  }
}

// ─── Event Listeners ──────────────────────────────────────────────────────────
addNewBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);

// ─── Init ─────────────────────────────────────────────────────────────────────
window.onload = async () => {
  await fetchAndCacheProducts();
  loadProducts();
};