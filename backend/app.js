const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const connectDB = require('./src/config/db'); // Ensure this is correct
const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const errorHandler = require('./src/utils/errorHandler');
const cartRoutes = require('./src/routes/cartRoutes')
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Enable credentials if you need to send cookies
}));
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); 
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use(errorHandler);

// Export the app
module.exports = app;
