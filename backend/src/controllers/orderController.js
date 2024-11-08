const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  const order = new Order({
    user: req.user._id,
    orderItems,
    totalPrice,
  });

  try {
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

module.exports = {
  createOrder,
};
