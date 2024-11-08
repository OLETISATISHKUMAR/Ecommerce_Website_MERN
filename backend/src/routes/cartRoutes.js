const express = require('express');
const { getCartItems, addToCart, removeFromCart, updateCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get all cart items for the authenticated user
router.get('/', protect, getCartItems);

// Route to add a product to the cart (with quantity)
router.post('/add/:productId', protect, addToCart);

// Route to remove a product from the cart
router.delete('/remove/:productId', protect, removeFromCart);

// Route to update the quantity of a product in the cart
router.put('/update/:productId', protect, updateCartItem);

module.exports = router;
