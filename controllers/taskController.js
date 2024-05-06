const TaskModel = require("../models/task");
const Utility = require("../models/utility");
const Customer = require("../models/customer");
const Staff = require("../models/staff");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const newTask = async (req, res) => {
  const {
    name,
    customerId,
    staffIds,
    utilities,
    description,
    price,
    productionCost,
  } = req.body;

  try {
    // Check if the customer exists,
    let customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found, create " });
    }

    // Create staff array with valid staff IDs
    const staffArray = await Promise.all(
      staffIds.map(async (staffId) => {
        const staff = await Staff.findById(staffId);
        if (staff) return staffId;
      })
    );

    // Calculate total cost of utilities
    let totalUtilityCost = 0;

    for (const { utility, quantity } of utilities) {
      const utilityInfo = await Utility.findById(utility);
      if (!utilityInfo) {
        return res
          .status(404)
          .json({ message: `Utility not found for ID: ${utility}` });
      }
      const utilityPrice = utilityInfo.price;
      totalUtilityCost += utilityPrice * quantity;
    }

    // Calculate profit
    const profit = price - (productionCost + totalUtilityCost);

    // Create the new task
    const newTask = await TaskModel.create({
      name,
      customerId,
      staffIds: staffArray,
      utilities,
      description,
      price,
      productionCost,
      profit,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewTaskById = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await TaskModel.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      updatedTaskData,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  newTask,
  getAllTasks,
  updateTask,
  deleteTask,
  viewTaskById,
};
