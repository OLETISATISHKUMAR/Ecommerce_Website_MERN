const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // Track product availability
    },
    category: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0, // Discount percentage (optional)
    },
    rating: {
      type: Number,
      default: 0, // Average product rating (optional)
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true, // Automatically include createdAt and updatedAt
  }
);

module.exports = mongoose.model("Product", productSchema);
