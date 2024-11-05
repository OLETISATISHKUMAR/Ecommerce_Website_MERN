const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

const router = express.Router();

// User registration and login routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/allusers", getAllUsers);
router.get("/get-user/:id", getUserById);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

module.exports = router;
