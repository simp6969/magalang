const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.url;

const connect = async () => {
  try {
    if (!url) {
      throw new Error("Missing MongoDB connection string in env var 'url'");
    }
    // Use recommended options for performance & stability
    await mongoose.connect(url, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Mongo connection error:", error.message);
  }
};

module.exports = connect;
