const express = require("express");
const {
  createPost,
  getPosts,
  getSinglePost,
  deleteSinglePost,
  updatePost,
} = require("../controllers/postController");

const router = express.Router();

router.route("/list").get(getPosts);
router.route("/singlepost/:id").get(getSinglePost);
router.route("/create").post(createPost);
router.route("/update/:id").put(updatePost);
router.route("/delete/:id").delete(deleteSinglePost);

module.exports = router;
