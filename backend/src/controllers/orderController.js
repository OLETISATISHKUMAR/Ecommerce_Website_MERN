const Order = require('../models/Order.js');

const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    console.warn('Order creation failed: No order items provided');
    res.status(400).json({ message: 'No order items' });
    return;
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    totalPrice,
  });

  try {
    const createdOrder = await order.save();
    console.log('Order created successfully:', createdOrder);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ message: 'Error creating order' });
  }
};

// Export the function with module.exports
module.exports = {
  createOrder,
};
