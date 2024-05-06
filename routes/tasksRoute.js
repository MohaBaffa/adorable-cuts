const express = require("express");
const staffRouter = express.Router();

const {
  newTask,
  getAllTasks,
  updateTask,
  deleteTask,
  viewTaskById,
} = require("../controllers/taskController");

const authenticateToken = require("../middleware/validateTokenHandler");
staffRouter.use(authenticateToken);

staffRouter.get("/", getAllTasks);
staffRouter.delete("/:id", deleteTask);
staffRouter.put("/:id", updateTask);
staffRouter.post("/", newTask);
staffRouter.get("/:id", viewTaskById);

module.exports = staffRouter;
