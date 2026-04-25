// routes/productRoutes.js
// Maps HTTP methods + paths → controller functions
// Also applies input validation rules here (keeps controllers clean)

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Validation rules for creating/updating a product
const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required'),
  body('sku').trim().notEmpty().withMessage('SKU is required'),
  body('quantity').isFloat({ min: 0 }).withMessage('Quantity must be 0 or more'),
  body('mrp').isFloat({ min: 0 }).withMessage('MRP must be 0 or more'),
];

// GET  /api/products        → list all
// POST /api/products        → create new (requires login)
router
  .route('/')
  .get(getAllProducts)
  .post(protect, productValidation, createProduct);

// PUT    /api/products/:id  → update (requires login)
// DELETE /api/products/:id  → delete (requires login)
router
  .route('/:id')
  .put(protect, productValidation, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
