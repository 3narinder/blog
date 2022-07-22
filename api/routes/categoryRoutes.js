const express = require("express");
const {
  list,
  createList,
  deleteSingleCategory,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/list").get(list);
router.route("/create").post(createList);
router.route("/update/:id").put(updateCategory);
router.route("/delete/:id").delete(deleteSingleCategory);

module.exports = router;
