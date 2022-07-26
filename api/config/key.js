const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  app: {
    name: "Newblog",
    version: "0.0.1",
  },
  database: {
    MONGO_URI: process.env.MONGO_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    tokenExp: "2d",
  },
};
