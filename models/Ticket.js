const mongoose = require("mongoose");
require("./Department.js");
require("./SubDepartment.js");
require("./User.js");
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "SubDepartment",
      required: true,
    },
    priority: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: String,
      required: false,
    },
    adminId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);
module.exports = model;
