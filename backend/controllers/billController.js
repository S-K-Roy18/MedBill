// controllers/billController.js
// Logic for creating and fetching bills

const { validationResult } = require('express-validator');
const Bill = require('../models/Bill');
const Product = require('../models/Product');

// ─── POST /api/bills ─────────────────────────────────────────────────────────
// Saves a new bill to the database
// Also deducts the sold quantities from inventory automatically
const createBill = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { customerName, customerPhone, items } = req.body;

  try {
    // Calculate totals
    let totalQty = 0;
    let totalAmount = 0;

    for (const item of items) {
      totalQty += item.quantity;
      totalAmount += item.total;
    }

    const bill = await Bill.create({
      customerName,
      customerPhone,
      items,
      totalQty,
      totalAmount,
    });

    // Deduct stock for each sold item (best-effort — log errors but don't fail the bill)
    for (const item of items) {
      try {
        await Product.findOneAndUpdate(
          { name: item.productName },
          { $inc: { quantity: -item.quantity } }
        );
      } catch (stockErr) {
        console.warn(`Stock update failed for "${item.productName}":`, stockErr.message);
      }
    }

    res.status(201).json({ success: true, data: bill });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ─── GET /api/bills ──────────────────────────────────────────────────────────
// Fetches all bills, newest first
// Supports optional ?from=YYYY-MM-DD&to=YYYY-MM-DD&search=BILL-000001 filters
const getAllBills = async (req, res) => {
  try {
    const filter = {};

    // Date range filter
    if (req.query.from || req.query.to) {
      filter.date = {};
      if (req.query.from) filter.date.$gte = new Date(req.query.from);
      if (req.query.to) {
        const toDate = new Date(req.query.to);
        toDate.setHours(23, 59, 59, 999); // include the whole "to" day
        filter.date.$lte = toDate;
      }
    }

    // Search by bill number (partial match, case-insensitive)
    if (req.query.search) {
      filter.billNumber = { $regex: req.query.search, $options: 'i' };
    }

    const bills = await Bill.find(filter).sort({ date: -1 });
    res.status(200).json({ success: true, count: bills.length, data: bills });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// ─── GET /api/bills/:id ──────────────────────────────────────────────────────
// Fetches a single bill by MongoDB _id
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ success: false, message: 'Bill not found' });
    }
    res.status(200).json({ success: true, data: bill });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { createBill, getAllBills, getBillById };
