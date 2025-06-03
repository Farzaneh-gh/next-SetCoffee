const mongoose = require("mongoose");
require("./Product");
require("./User");

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },

    expiryDate: {
      type: Date,
      required: false,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maxUsePerUser: {
      type: Number,
      required: true,
    },
    totalUse: {
      type: Number,
      default: 0,
    },
    usedBy: {
      type: [mongoose.Types.ObjectId],
      ref: "User",
      default: [],
    },
    DateCreated: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const model = mongoose.models.Discount || mongoose.model("Discount", schema);
module.exports = model;
