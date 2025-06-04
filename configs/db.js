const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to DB successfully");
    }
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};

module.exports = connectToDB;
