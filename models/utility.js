const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UtilitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityAvailable: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const UtilityModel = mongoose.model("Utility", UtilitySchema);

module.exports = UtilityModel;
