const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get all cart items for the logged-in user
const getCartItems = async (req, res) => {
  try {
    console.log(`Fetching cart items for user: ${req.user.id}`);

    // Find the user's cart by userId and populate product details
    const cart = await Cart.findOne({ userId: req.user.id }).populate(
      "products.product"
    );

    // If cart not found or empty
    if (!cart || cart.products.length === 0) {
      console.log("Cart is empty");
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Respond with the cart items
    console.log("Cart items found:", cart.products);
    res.json(cart.products);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart items" });
  }
};

// Add product to cart (with quantity)
const addToCart = async (req, res) => {
  const { productId } = req.params; // Extract product ID from URL parameter
  const { quantity } = req.body; // Extract quantity from request body

  // Ensure quantity is valid
  if (!quantity || quantity <= 0) {
    console.log("Invalid quantity:", quantity);
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    console.log(`Adding product ${productId} with quantity ${quantity} to cart`);

    // Check if product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    // Ensure userId is set (from authentication middleware)
    const userId = req.user.id; // Assuming req.user.id is set by the auth middleware
    if (!userId) {
      console.log("User not authenticated");
      return res.status(400).json({ message: "User not authenticated" });
    }

    // Step 1: Find the user's cart or create a new one
    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      console.log("Cart not found, creating a new one");
      // Create a new cart if it doesn't exist
      cart = new Cart({
        userId: userId, // Set userId from req.user.id
        products: [],
      });
    }

    // Step 2: Check if the product is already in the cart
    const existingItem = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Update the quantity if the product is already in the cart
      console.log(`Product already in cart. Updating quantity by ${quantity}`);
      existingItem.quantity += quantity;
    } else {
      // Add the product to the cart if it's not already in the cart
      console.log("Product not in cart. Adding new product");
      cart.products.push({ product: productId, quantity });
    }

    // Step 3: Save the cart
    await cart.save();
    console.log("Cart updated successfully");

    // Step 4: Send back the updated cart
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

// Remove product from cart
// Remove product from cart
const removeFromCart = async (req, res) => {
  const { productId } = req.params; // Extract product ID from URL parameter

  try {
    console.log(`Removing product ${productId} from cart`);

    // Find the user's cart by userId
    let cart = await Cart.findOne({ userId: req.user.id });

    // If cart not found, send a 404 error
    if (!cart) {
      console.log("Cart not found");
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the product in the cart
    const index = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    // If product not found in the cart, send a 404 error
    if (index === -1) {
      console.log("Product not found in cart");
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the product from the cart
    cart.products.splice(index, 1);
    await cart.save(); // Save the updated cart
    console.log(`Product ${productId} removed from cart`);

    // Respond with the updated cart items
    res.status(200).json({ message: "Product removed from cart", cart: cart.products });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};


// Update quantity of product in cart
// Update quantity of product in cart
const updateCartItem = async (req, res) => {
  const { productId } = req.params; // Get the product ID from URL parameter
  const { quantity } = req.body; // Get the quantity from the request body

  // Validation for quantity (ensures the quantity is a positive number)
  if (!quantity || quantity <= 0) {
    console.log("Invalid quantity:", quantity);
    return res.status(400).json({ message: "Invalid quantity" });
  }

  try {
    console.log(`Updating product ${productId} quantity to ${quantity} in cart`);

    // Find the user's cart by userId
    let cart = await Cart.findOne({ userId: req.user.id });

    // If cart not found, send a 404 error
    if (!cart) {
      console.log("Cart not found");
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the product in the cart
    const cartItem = cart.products.find(
      (item) => item.product.toString() === productId
    );
    
    // If the product is not found in the cart, send a 404 error
    if (!cartItem) {
      console.log("Product not found in cart");
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity of the product in the cart
    cartItem.quantity = quantity;
    await cart.save(); // Save the updated cart

    console.log(`Product ${productId} quantity updated to ${quantity}`);

    // Send the updated cart details back as the response
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating product in cart:", error);
    res.status(500).json({ message: "Error updating product in cart" });
  }
};


module.exports = {
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItem,
};
