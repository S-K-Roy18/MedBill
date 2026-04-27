// scripts/billing.js
// Powers the pharmacy billing form + receipt

const API_URL = '/api';

// ── DOM refs ────────────────────────────────────────────────
const productNameInput  = document.getElementById('productName');
const quantityInput     = document.getElementById('quantity');
const priceInput        = document.getElementById('price');
const discountInput     = document.getElementById('discount');
const totalPriceInput   = document.getElementById('totalPrice');
const receiptBody       = document.getElementById('receiptBody');
const datalist          = document.getElementById('productSuggestions');

// Totals
const totalQtyEl    = document.getElementById('totalQty');
const totalAmountEl = document.getElementById('totalAmount');
const subtotalEl    = document.getElementById('subtotalAmt');
const discountEl    = document.getElementById('discountAmt');

// Running state
let cartItems       = [];
let itemSerial      = 0;
let runningSubtotal = 0;   // sum before discount
let runningDiscount = 0;   // total discount amount
let runningTotal    = 0;   // final amount
let runningQty      = 0;
let productDatabase = [];

window.cartItems = cartItems;

// ── Auth ────────────────────────────────────────────────────
function getToken() { return localStorage.getItem('mbmsToken'); }

// ── Load products from API ──────────────────────────────────
async function initAutocomplete() {
  try {
    const res  = await fetch(API_URL + '/products');
    const json = await res.json();
    if (!json.success) throw new Error(json.message);
    productDatabase = json.data;
  } catch (err) {
    console.warn('Backend offline — using sample products:', err.message);
    productDatabase = [
      { name: 'Paracetamol 500mg',  mrp: 45.00,  quantity: 200 },
      { name: 'Amoxicillin 250mg',  mrp: 120.00, quantity: 100 },
      { name: 'Ibuprofen 400mg',    mrp: 60.50,  quantity: 80  },
      { name: 'Vitamin C 500mg',    mrp: 150.00, quantity: 300 },
      { name: 'Cough Syrup 100ml',  mrp: 85.00,  quantity: 60  },
    ];
  }

  datalist.innerHTML = '';
  productDatabase.forEach(function(item) {
    var opt  = document.createElement('option');
    opt.value = item.name;
    datalist.appendChild(opt);
  });
}

// ── Auto-fill price on product select ──────────────────────
productNameInput.addEventListener('input', function() {
  var match = productDatabase.find(function(p) {
    return p.name.toLowerCase() === productNameInput.value.trim().toLowerCase();
  });
  if (match) {
    priceInput.value = match.mrp || match.price || '';
    calculateTotal();
  }
});

// ── Live total calculation ──────────────────────────────────
function calculateTotal() {
  var qty      = parseFloat(quantityInput.value) || 0;
  var price    = parseFloat(priceInput.value)    || 0;
  var disc     = parseFloat(discountInput.value) || 0;
  var subtotal = qty * price;
  var discAmt  = subtotal * (disc / 100);
  totalPriceInput.value = (subtotal - discAmt).toFixed(2);
}
[quantityInput, priceInput, discountInput].forEach(function(el) {
  el.addEventListener('input', calculateTotal);
});

// ── ADD item to receipt ─────────────────────────────────────
document.getElementById('billingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  var productName = productNameInput.value.trim();
  var qty         = parseFloat(quantityInput.value);
  var unitPrice   = parseFloat(priceInput.value)    || 0;
  var disc        = parseFloat(discountInput.value)  || 0;
  var lineTotal   = parseFloat(totalPriceInput.value);
  var lineSubtotal = qty * unitPrice;
  var lineDiscAmt  = lineSubtotal - lineTotal;

  if (!productName || qty <= 0 || isNaN(lineTotal)) {
    alert('Please enter a valid product name and quantity!');
    return;
  }

  // Stock check
  var dbProduct = productDatabase.find(function(p) {
    return p.name.toLowerCase() === productName.toLowerCase();
  });
  if (dbProduct && typeof dbProduct.quantity === 'number' && qty > dbProduct.quantity) {
    alert('Only ' + dbProduct.quantity + ' units of "' + productName + '" in stock!');
    return;
  }

  // Remove empty state row on first item
  if (typeof window.removeEmptyRow === 'function') window.removeEmptyRow();

  itemSerial++;

  // Add to cart data
  cartItems.push({
    productName : productName,
    quantity    : qty,
    price       : unitPrice,
    discount    : disc,
    total       : lineTotal
  });

  // Build receipt table row
  var row = document.createElement('tr');
  row.innerHTML =
    '<td class="col-sno">'  + itemSerial + '</td>' +
    '<td class="col-name">' + productName + '</td>' +
    '<td class="col-qty">'  + qty + '</td>' +
    '<td class="col-mrp">&#8377;' + unitPrice.toFixed(2) + '</td>' +
    '<td class="col-disc">' + (disc > 0 ? disc + '%' : '—') + '</td>' +
    '<td class="col-amt"><strong>&#8377;' + lineTotal.toFixed(2) + '</strong></td>';
  receiptBody.appendChild(row);

  // Update running totals
  runningSubtotal += lineSubtotal;
  runningDiscount += lineDiscAmt;
  runningTotal    += lineTotal;
  runningQty      += qty;

  subtotalEl.textContent    = runningSubtotal.toFixed(2);
  discountEl.textContent    = runningDiscount.toFixed(2);
  totalAmountEl.textContent = runningTotal.toFixed(2);
  totalQtyEl.textContent    = runningQty;

  // Amount in words
  if (typeof window.updateAmountWords === 'function') {
    window.updateAmountWords(runningTotal);
  }

  // Item counter badge
  if (typeof window.updateItemCounter === 'function') {
    window.updateItemCounter(cartItems.length);
  }

  // Clear product row
  productNameInput.value = '';
  quantityInput.value    = '';
  priceInput.value       = '';
  discountInput.value    = '';
  totalPriceInput.value  = '';
  productNameInput.focus();
});

// ── SAVE bill to DB + PRINT ─────────────────────────────────
async function printBill() {
  if (cartItems.length === 0) {
    alert('Add at least one medicine before saving!');
    return;
  }

  var customerName  = (document.getElementById('patientName')?.value  || '').trim() || 'Walk-in Customer';
  var customerPhone = (document.getElementById('patientPhone')?.value || '').trim();

  try {
    var res = await fetch(API_URL + '/bills', {
      method  : 'POST',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      body: JSON.stringify({ customerName: customerName, customerPhone: customerPhone, items: cartItems })
    });
    var json = await res.json();

    if (json.success) {
      var billNo = json.data.billNumber;
      document.getElementById('billNumber').textContent = billNo;
      console.log('Bill saved:', billNo, '| Stock deducted for', cartItems.length, 'item(s)');

      // Show SAVED stamp briefly
      var stamp = document.getElementById('paidStamp');
      if (stamp) { stamp.style.display = 'flex'; }
    } else {
      console.warn('Save issue (printing anyway):', json.message);
    }
  } catch (err) {
    console.warn('Backend offline — printing without saving:', err.message);
  }

  // Update time just before print
  var now = new Date();
  document.getElementById('receiptDate').textContent =
    now.toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'});
  document.getElementById('receiptTime').textContent =
    now.toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit'});

  setTimeout(function() { window.print(); }, 200);
}

// ── Init ────────────────────────────────────────────────────
document.getElementById('currentDate').textContent =
  new Date().toLocaleDateString('en-IN', {weekday:'long', day:'2-digit', month:'long', year:'numeric'});

initAutocomplete();
