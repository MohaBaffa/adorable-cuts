const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StaffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  typeOfStaff: {
    type: String,
    default: "general",
  },
});

const StaffModel = mongoose.model("Staff", StaffSchema);

module.exports = StaffModel;
