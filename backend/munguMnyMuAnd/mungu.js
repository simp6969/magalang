const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.url;

const connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("mungu irtsishy");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
