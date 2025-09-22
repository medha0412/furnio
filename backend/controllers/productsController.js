const Product = require('../models/Product');
const sampleProducts = require('../seed/sampleProducts');

// GET /products - Get all products with sorting, filtering, and pagination
const getProducts = async (req, res) => {
  try {
    // Parse query parameters
    const {
      sortBy = '_id',
      sortOrder = 'asc',
      brand,
      category,
      material,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (brand) {
      filter.brand = { $regex: brand, $options: 'i' };
    }
    
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    if (material) {
      filter.material = { $regex: material, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Build sort object
    const sort = {};
    const sortField = sortBy === 'id' ? '_id' : sortBy;
    sort[sortField] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with filtering, sorting, and pagination
    const [products, totalCount] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalCount / limitNum);

    console.log('Product IDs:', products.map(p => p._id.toString()));
    res.json({
      products,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// POST /products - Add a new product
const createProduct = async (req, res) => {
  try {
    const { name, brand, category, material, price, description, image } = req.body;

    // Validate required fields
    if (!name || !brand || !category || !material || !price) {
      return res.status(400).json({
        error: 'Missing required fields: name, brand, category, material and price are required'
      });
    }

    const newProduct = new Product({
      name,
      brand,
      category,
      material,
      price: parseFloat(price),
      description: description || '',
      image: image || 'https://via.placeholder.com/300x300?text=Product+Image'
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// PUT /products/:id - Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, category, material, price, description } = req.body;

    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (brand) updateData.brand = brand;
    if (category) updateData.category = category;
    if (material) updateData.material = material;
    if (price) updateData.price = parseFloat(price);
    if (description !== undefined) updateData.description = description;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// DELETE /products/:id - Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// POST /seed - Populate database with sample data
const seedProducts = async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    
    res.json({ 
      message: 'Sample products seeded successfully', 
      count: insertedProducts.length 
    });
  } catch (error) {
    console.error('Error seeding products:', error);
    res.status(500).json({ error: 'Failed to seed products' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts
};

