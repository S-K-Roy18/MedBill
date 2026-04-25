// routes/billRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createBill, getAllBills, getBillById } = require('../controllers/billController');
const { protect } = require('../middleware/authMiddleware');

// Validation for creating a bill
const billValidation = [
  body('customerName').trim().notEmpty().withMessage('Customer name is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.productName').notEmpty().withMessage('Each item must have a product name'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be valid'),
  body('items.*.total').isFloat({ min: 0 }).withMessage('Total must be valid'),
];

// GET  /api/bills   → all bills (supports ?from=&to=&search= filters)
// POST /api/bills   → create bill (requires login)
router
  .route('/')
  .get(protect, getAllBills)
  .post(protect, billValidation, createBill);

// GET /api/bills/:id → single bill
router.route('/:id').get(protect, getBillById);

module.exports = router;
