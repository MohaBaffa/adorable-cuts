const Staff = require("../models/staff");
const Task = require("../models/task");

// GET all staff members
const getStaffs = async (req, res) => {
  try {
    const staffMembers = await Staff.find();
    res.json(staffMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStaff = async (req, res) => {
  const id = req.params.id;
  try {
    const staff = await Staff.findByIdAndDelete(id);
    if (!staff) {
      return res.status(404).json({ message: "No Staff Found!" });
    }
    res.json({ message: "Staff member deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE staff member by ID
const updateStaff = async (req, res) => {
  const id = req.params.id;

  try {
    const staff = await Staff.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!staff) {
      return res.status(404).json({ message: "No staff found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// GET tasks assigned to a specific staff member
const getStaffTask = async (req, res) => {
  const staffId = req.params.id;
  try {
    const tasks = await Task.find({ staffIds: staffId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new staff member
const createStaff = async (req, res) => {
  const { name, phoneNumber, typeOfStaff } = req.body;
  if (!name || !phoneNumber || !typeOfStaff) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }

  const ifDuplicate = await Staff.findOne({ phoneNumber });
  if (ifDuplicate) {
    return res.status(409).json({
      message: "A staff member with this phone number already exists.",
    });
  }

  try {
    const newStaff = await Staff.create({
      name,
      phoneNumber,
      typeOfStaff,
    });
    res.status(201).json(newStaff);
  } catch (error) {
    console.error("Error creating staff member:", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// GET a single staff member by ID
const getStaffMember = async (req, res) => {
  const id = req.params.id;
  try {
    const staff = await Staff.findById(id);
    if (!staff) {
      return res.status(404).json({ message: "No staff found" });
    }
    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  createStaff,
  getStaffMember,
  getStaffTask,
  updateStaff,
  deleteStaff,
  getStaffs,
};
