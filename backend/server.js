require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./utils/database');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/products', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Available routes:`);
  console.log(`  GET    /products - Get products with filtering, sorting, pagination`);
  console.log(`  POST   /products - Create new product`);
  console.log(`  PUT    /products/:id - Update product`);
  console.log(`  DELETE /products/:id - Delete product`);
  console.log(`  POST   /products/seed - Populate with sample data`);
});

module.exports = app;
