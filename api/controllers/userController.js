const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../config/key").jwt.secret;

//register
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ msg: "email is already in use" });
    }

    //instance created
    let newUser = new User({
      firstName,
      lastName,
      email,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    let user = await newUser.save();
    const palyLoad = {
      id: user._id,
    };
    const token = jwt.sign(palyLoad, secret, { expiresIn: "2d" });
    await res.json({
      email: user.email,
      token: `Bearer ${token}`,
      firstName,
      lastName,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

//Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ msg: "Your email or password is incorrect" });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "2d" });
    await res.json({
      email: user.email,
      token: `Bearer ${token}`,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};
