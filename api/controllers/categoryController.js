const Category = require("../models/CategoryModel");

// Get categories
exports.list = async (req, res) => {
  try {
    const lists = await Category.find();
    res.status(200).json(lists);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error Fetching Categories" });
  }
};

// Create categories
exports.createList = async (req, res) => {
  const { name } = req.body;
  try {
    const newList = Category({
      name,
    });

    const saved = await newList.save();
    res.status(200).json(saved);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error Creating Category" });
  }
};

//update category

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Post not found" });
  }
};

//delete category

exports.deleteSingleCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true, msg: "category have been deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Category can not be deleted" });
  }
};
