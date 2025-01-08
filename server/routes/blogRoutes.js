import express from "express";
import {
  createBlog,
  uploadImageAws,
  verifyJWT,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/get-upload-url", uploadImageAws);

router.post("/create-blog", verifyJWT, createBlog);

export default router;
