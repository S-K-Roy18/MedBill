// models/Bill.js
// Represents a generated invoice/bill

const mongoose = require('mongoose');

// Counter helper to auto-generate bill numbers like BILL-000001
const counterSchema = new mongoose.Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});
const Counter = mongoose.model('Counter', counterSchema);

// Sub-schema for each item line in the bill
const billItemSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },       // unit MRP
    discount: { type: Number, default: 0 },        // discount percentage
    total: { type: Number, required: true },        // final line total after discount
  },
  { _id: false } // no separate _id for sub-docs
);

const billSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      unique: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
      default: '',
    },
    items: {
      type: [billItemSchema],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'A bill must have at least one item',
      },
    },
    totalQty: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Auto-generate bill number before saving (BILL-000001, BILL-000002, ...)
billSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      'billNumber',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    // Pad with leading zeros → BILL-000001
    this.billNumber = `BILL-${String(counter.seq).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Bill', billSchema);
