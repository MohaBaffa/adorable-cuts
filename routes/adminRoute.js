const express = require("express");

const adminRoute = express.Router();

const {
  registerAdmin,
  loginAdmin,
  adminDashboard,
} = require("../controllers/adminController");

const authenticateToken = require("../middleware/validateTokenHandler");

adminRoute.get("/dashboard", authenticateToken, adminDashboard);
adminRoute.post("/register", registerAdmin);
adminRoute.post("/login", loginAdmin);

module.exports = adminRoute;
