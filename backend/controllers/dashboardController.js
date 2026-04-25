// controllers/dashboardController.js
// Provides summary stats for the Dashboard page

const Bill = require('../models/Bill');
const Product = require('../models/Product');

// ─── GET /api/dashboard/stats ────────────────────────────────────────────────
const getDashboardStats = async (req, res) => {
  try {
    // Total number of bills (= total orders)
    const totalOrders = await Bill.countDocuments();

    // Sum of all bill amounts (total revenue)
    const revenueResult = await Bill.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Total number of products in inventory
    const totalProducts = await Product.countDocuments();

    // Low-stock products (quantity <= 10)
    const lowStockProducts = await Product.find({ quantity: { $lte: 10 } })
      .select('name quantity')
      .sort({ quantity: 1 });

    // Recent 5 bills for "Recent Orders" table
    const recentBills = await Bill.find()
      .sort({ date: -1 })
      .limit(5)
      .select('billNumber customerName date totalAmount');

    // Top 5 best-selling products (by total quantity sold across all bills)
    const bestSellers = await Bill.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.productName', totalSold: { $sum: '$items.quantity' } } },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        totalProducts,
        lowStockProducts,
        recentBills,
        bestSellers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = { getDashboardStats };
