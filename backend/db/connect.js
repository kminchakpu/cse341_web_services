const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let database;

const connectDatabase = async () => {
  try {
    await client.connect();
    database = client.db("cse341");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const getDatabase = () => database;

module.exports = {
  connectDatabase,
  getDatabase,
};