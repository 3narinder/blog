const express = require("express");
const auth = require("../middleware/auth");

const { register, login } = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
