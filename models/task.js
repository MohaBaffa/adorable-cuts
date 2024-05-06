const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  staffIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
  ],
  utilities: [
    {
      utility: {
        type: Schema.Types.ObjectId,
        ref: "Utility",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  productionCost: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  profit: {
    type: String,
  },
});

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = TaskModel;
