const mongoose = require("mongoose");
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "jobTracker",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};
module.exports = {
  connectDatabase,
};