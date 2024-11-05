const express = require('express');
const { createOrder }  = require( '../controllers/orderController.js');
const { protect }  = require( '../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', protect, createOrder);

module.exports =  router;
