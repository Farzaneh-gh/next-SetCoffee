const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URL);

    if (mongoose.connections[0].readyState) {
      // Already connected
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to DB successfully");
    }
  } catch (err) {
    console.error("Error connecting to DB:", err);
  }
};

module.exports = connectToDB;
