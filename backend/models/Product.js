const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  material: {
    type: String,
    trim: true,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300x300?text=Product+Image'
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

// Create and export the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;


