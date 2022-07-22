const mongoose = require("mongoose");
const { database } = require("./key");

const DBconnect = () => {
  try {
    mongoose.connect(database.MONGO_URI, () => console.log("mongoose is connected"));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = DBconnect;
