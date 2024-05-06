const Item = require("../models/utility");

const createItem = async (req, res) => {
  const { name, pricePerUnit, quantityAvailable } = req.body;

  try {
    // Check if item with the same name already exists
    const duplicate = await Item.findOne({ name });

    if (duplicate) {
      // If duplicate item found, return a 409 Conflict status
      return res
        .status(409)
        .json({ message: "Item with this name already exists" });
    }

    // If no duplicate, create a new item
    const newItem = await Item.create({
      name,
      pricePerUnit,
      quantityAvailable,
    });

    // Respond with the newly created item
    res.status(201).json(newItem);
  } catch (error) {
    // Handle any errors that occur during item creation
    res.status(400).json({ message: error.message });
  }
};

const getItemById = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Utility item not found" });
    }

    res.json({ message: "Utility item deleted" });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const { name, pricePerUnit, quantityAvailable } = req.body;

  try {
    // Prepare an object with the fields to update
    const updateFields = {};
    if (name) updateFields.name = name;
    if (pricePerUnit) updateFields.pricePerUnit = pricePerUnit;
    if (quantityAvailable) updateFields.quantityAvailable = quantityAvailable;

    // Find the item by ID and update its fields
    const updatedItem = await Item.findByIdAndUpdate(itemId, updateFields, {
      new: true,
    });

    // Check if item was not found
    if (!updatedItem) {
      return res.status(404).json({ message: "Utility item not found" });
    }

    // Respond with the updated item
    res.json(updatedItem);
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(400).json({ message: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  updateItem,
  removeItem,
  getItemById,
};
