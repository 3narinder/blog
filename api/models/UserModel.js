const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
  firstName: String,
  lastName: String,
  DOB: String,

  role: {
    type: String,
    enum: ["VISITOR", "ADMIN"],
    default: "VISITOR",
  },
});

module.exports = mongoose.model("user", UserSchema);
