const mongoose = require("mongoose");
const { Content } = require("next/font/google/index.js");
require("./Comment.js");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  shortDescription: {
    type: String,
    required: true,
  },
  longDescription: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: false,
  },
  image: {
    data: Buffer,
    contentType: String,
   
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  smell: {
    type: String,
    required: true,
  },
  suitableFor: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 5,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  tags: {
    type: [String],
    required: true,
  },
});

const model = mongoose.models.Product || mongoose.model("Product", schema);
module.exports = model;
