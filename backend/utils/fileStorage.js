const fs = require('fs').promises;
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'data', 'products.json');

// Utility function to read products from JSON file
async function readProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

// Utility function to write products to JSON file
async function writeProducts(products) {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

// Utility function to generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
  readProducts,
  writeProducts,
  generateId
};
