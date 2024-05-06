const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Customer already exists"],
  },
  age: {
    type: Number,
    required: true,
  },
  contactInformation: {
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    address: {
      type: String,
    },
  },
  measurements: {
    height: Number,
    bust: Number,
    waist: Number,
    hips: Number,
    shoulderWidth: Number,
    sleeveLength: Number,
    neck: Number,
    backLength: Number,
    thigh: Number,
    knee: Number,
    calf: Number,
    outseam: Number,
    rise: Number,
    wrist: Number,
    bicep: Number,
    armpit: Number,
    chest: Number,
    shirtLength: Number,
    crotch: Number,
  },
  signupDate: {
    type: Date,
    default: Date.now, // Set the default value to the current date/time
  },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
