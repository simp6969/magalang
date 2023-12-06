const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.url;

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("successfully connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
