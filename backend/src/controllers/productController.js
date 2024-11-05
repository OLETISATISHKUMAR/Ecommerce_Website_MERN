const Product = require('../models/Product.js');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log('Fetched all products');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      console.log(`Fetched product with ID: ${req.params.id}`);
      res.json(product);
    } else {
      console.warn(`Product not found with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product:', error.message);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const newProduct = new Product({ name, price, description, imageUrl });
    const savedProduct = await newProduct.save();
    console.log('Created new product:', savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Update an existing product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, imageUrl },
      { new: true }
    );
    if (updatedProduct) {
      console.log(`Updated product with ID: ${req.params.id}`);
      res.json(updatedProduct);
    } else {
      console.warn(`Product not found for update with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      console.log(`Deleted product with ID: ${req.params.id}`);
      res.json({ message: 'Product deleted successfully' });
    } else {
      console.warn(`Product not found for deletion with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
