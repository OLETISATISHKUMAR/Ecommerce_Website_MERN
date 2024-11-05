const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Function to register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log(`Registration failed: User with email ${email} already exists.`);
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    console.log(`User registered successfully: ${user._id} - ${user.name}`);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: 'User registered successfully!',
    });
  } else {
    console.log(`Registration failed: Invalid user data for email ${email}.`);
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Function to log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Log the user details for debugging
  console.log('Login attempt:', { email, password });

  // Check if user exists and password is correct
  if (user) {
    console.log('User found:', user);
    const isMatch = await user.matchPassword(password);
    if (isMatch) {
      console.log(`User logged in successfully: ${user._id} - ${user.name}`);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: 'Login successful!',
      });
    } else {
      console.log(`Login failed: Incorrect password for email ${email}.`);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } else {
    console.log(`Login failed: No user found with email ${email}.`);
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Function to get all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  console.log(`Fetched all users: ${users.length} users found.`);
  res.json({
    users,
    message: 'Users fetched successfully!',
  });
};

// Function to get a single user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    res.json({
      user,
      message: 'User fetched successfully!',
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Function to update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await User.findByIdAndUpdate(id, updates, { new: true });

  if (user) {
    console.log(`User updated successfully: ${user._id} - ${user.name}`);
    res.json({
      user,
      message: 'User updated successfully!',
    });
  } else {
    console.log(`Update failed: No user found with ID ${id}.`);
    res.status(404).json({ message: 'User not found' });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (user) {
    console.log(`User deleted successfully: ${user._id} - ${user.name}`);
    res.json({ 
      message: 'User deleted successfully!' 
    });
  } else {
    console.log(`Delete failed: No user found with ID ${id}.`);
    res.status(404).json({ message: 'User not found' });
  }
};

// Export the functions
module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
