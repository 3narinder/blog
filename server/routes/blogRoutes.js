import express from "express";
import { uploadImageAws } from "../controllers/blogController.js";

const router = express.Router();

router.get("/get-upload-url", uploadImageAws);

export default router;
