const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "ALL fields are mandatory" });
  }

  try {
    const adminExists = await Admin.findOne({ username });
    if (adminExists) {
      return res
        .status(400)
        .json({ message: `User Already Exists ${adminExists}` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });
    if (admin) {
      res.status(201).json({ message: `Admin created: ${admin.email}` });
    }
    res.status(201).json({ message: "Admin account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err, message: "Internal Server Error!" });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are mandatory" });
  }
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const accessToken = jwt.sign(
        {
          admin: {
            username: admin.username,
            email: admin.email,
            id: admin.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "12h" }
      );
      console.log(accessToken);

      return res.status(200).json({ accessToken });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const adminDashboard = (req, res) => {
  res.send("hello world");
};

module.exports = {
  registerAdmin,
  loginAdmin,
  adminDashboard,
};
