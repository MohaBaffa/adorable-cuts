const express = require("express");
const staffRouter = express.Router();

const {
  getStaffs,
  deleteStaff,
  updateStaff,
  getStaffMember,
  createStaff,
  getStaffTask,
} = require("../controllers/staffController");

const authenticateToken = require("../middleware/validateTokenHandler");

staffRouter.use(authenticateToken);
// Export the staffRouter with all route handlers
staffRouter.get("/", getStaffs);
staffRouter.delete("/:id", deleteStaff);
staffRouter.put("/:id", updateStaff);
staffRouter.get("/:id/tasks", getStaffTask);
staffRouter.post("/", createStaff);
staffRouter.get("/:id", getStaffMember);

module.exports = staffRouter;
