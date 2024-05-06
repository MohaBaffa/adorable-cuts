const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { connectToMongoDB } = require("./config/dbConfig");
const app = express();
const errorHandler = require("./middleware/errorHandler");

connectToMongoDB();

app.use(express.json());

const staffRoute = require("./routes/staffRoute");
const adminRoute = require("./routes/adminRoute");
const rootRoute = require("./routes/root");
const taskRoute = require("./routes/tasksRoute");
const storeRoute = require("./routes/storeRoute");
const customerRoute = require("./routes/customerRoute");

app.use("/", rootRoute);
app.use("/admin", adminRoute);
app.use("/staff", staffRoute);
app.use("/task", taskRoute);
app.use("/store", storeRoute);
app.use("/customer", customerRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
