const express = require("express");
const customerRouter = express.Router();
const {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomer,
  getAllCustomers,
  getCustomerTasks,
} = require("../controllers/customerController");

const authenticateToken = require("../middleware/validateTokenHandler");

customerRouter.use(authenticateToken);

customerRouter.post("/", createCustomer);
customerRouter.get("/:id", getCustomer);
customerRouter.get("/", getAllCustomers);
customerRouter.get("/:id/tasks", getCustomerTasks);
customerRouter.put("/:id", updateCustomer);
customerRouter.delete("/:id", deleteCustomer);

module.exports = customerRouter;
