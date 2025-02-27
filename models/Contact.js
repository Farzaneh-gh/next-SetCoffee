const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const model = mongoose.models.Contact || mongoose.model("Contact", schema);
module.exports = model;
