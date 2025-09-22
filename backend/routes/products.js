const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts
} = require('../controllers/productsController');

// GET /products - Get all products with sorting, filtering, and pagination
router.get('/', getProducts);

// POST /products - Add a new product
router.post('/', createProduct);

// PUT /products/:id - Update a product
router.put('/:id', updateProduct);

// DELETE /products/:id - Delete a product
router.delete('/:id', deleteProduct);

// POST /seed - Populate products.json with sample data
router.post('/seed', seedProducts);

module.exports = router;
