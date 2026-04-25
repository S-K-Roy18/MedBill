// backend/seed.js
// Run this ONCE to populate the database with:
//   - Sample medicines in inventory
//   - An admin user account (admin / Admin@123)
//
// Usage: node seed.js

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

const sampleProducts = [
  { name: 'Paracetamol 500mg', sku: 'MED-PARA-01', quantity: 200, mrp: 45.00, category: 'Pain Relief' },
  { name: 'Paracetamol 650mg', sku: 'MED-PARA-02', quantity: 150, mrp: 55.00, category: 'Pain Relief' },
  { name: 'Amoxicillin 250mg', sku: 'ANT-AMOX-05', quantity: 100, mrp: 120.00, category: 'Antibiotic' },
  { name: 'Ibuprofen 400mg', sku: 'PAIN-IBU-02', quantity: 80, mrp: 60.50, category: 'Pain Relief' },
  { name: 'Vitamin C 500mg', sku: 'SUP-VITC-10', quantity: 300, mrp: 150.00, category: 'Supplement' },
  { name: 'Cough Syrup 100ml', sku: 'SYR-COUGH-09', quantity: 60, mrp: 85.00, category: 'Cough & Cold' },
  { name: 'Cetirizine 10mg', sku: 'ALL-CETI-03', quantity: 120, mrp: 35.00, category: 'Allergy' },
  { name: 'Metformin 500mg', sku: 'DIA-MET-07', quantity: 90, mrp: 75.00, category: 'Diabetes' },
  { name: 'Omeprazole 20mg', sku: 'GAS-OME-04', quantity: 110, mrp: 95.00, category: 'Gastric' },
  { name: 'Azithromycin 500mg', sku: 'ANT-AZI-06', quantity: 50, mrp: 180.00, category: 'Antibiotic' },
];

const adminUser = {
  username: 'admin',
  email: 'admin@mbms.com',
  password: 'Admin@123',
  role: 'admin',
};

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing products and users');

    // Insert products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${sampleProducts.length} sample products`);

    // Create admin user (password will be hashed by the User model pre-save hook)
    await User.create(adminUser);
    console.log('✅ Created admin user:');
    console.log('   Username: admin');
    console.log('   Password: Admin@123');

    console.log('\n🎉 Database seeded successfully!');
    console.log('   You can now start the server: npm run dev');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedDatabase();
