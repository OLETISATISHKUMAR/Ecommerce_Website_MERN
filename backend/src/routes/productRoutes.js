const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.js");

const router = express.Router();

// Get all products
router.get("/getall", getProducts);

// Get a product by ID
router.get("/get-product/:id", getProductById);

// Create a new product
router.post("/create-product", createProduct);

// Update an existing product by ID
router.put("/update-product/:id", updateProduct);

// Delete a product by ID
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;
