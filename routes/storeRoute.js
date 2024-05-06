const express = require("express");

const {
  createItem,
  getAllItems,
  updateItem,
  removeItem,
  getItemById,
} = require("../controllers/utilityController");

const authenticateToken = require("../middleware/validateTokenHandler");

const utilityRouter = express.Router();
utilityRouter.use(authenticateToken);

utilityRouter.post("/", createItem);

utilityRouter.get("/", getAllItems);

utilityRouter.get("/:id", getItemById);

utilityRouter.put("/:id", updateItem);

utilityRouter.delete("/:id", removeItem);

module.exports = utilityRouter;
