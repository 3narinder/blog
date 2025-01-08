import express from "express";
import {
  signup,
  login,
  googleAuth,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-auth", googleAuth);
router.get("/get-users", getAllUsers);

export default router;
