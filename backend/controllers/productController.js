// controllers/productController.js
// All logic for the Product/Inventory APIs

const { validationResult } = require('express-validator');
const Product = require('../models/Product');

// ─── GET /api/products ───────────────────────────────────────────────────────
// Returns all products, sorted by name
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ─── POST /api/products ──────────────────────────────────────────────────────
// Adds a new product to inventory
const createProduct = async (req, res) => {
  // Check for validation errors from express-validator middleware
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, sku, quantity, mrp, expiryDate, category } = req.body;

  try {
    // Check if SKU already exists
    const existing = await Product.findOne({ sku: sku.toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: `SKU "${sku}" already exists` });
    }

    const product = await Product.create({ name, sku, quantity, mrp, expiryDate, category });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ─── PUT /api/products/:id ───────────────────────────────────────────────────
// Updates an existing product
const updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return updated doc, run schema validators
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ─── DELETE /api/products/:id ────────────────────────────────────────────────
// Removes a product from inventory
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
