const Post = require("../models/PostModel");

//Get posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error fetching posts" });
  }
};

// Get single post

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error fetching post" });
  }
};

// Create post

exports.createPost = async (req, res) => {
  const { title, content, category, images, rating, author } = req.body;

  try {
    const newPost = Post({
      title,
      content,
      author,
      category,
      images,
      rating,
    });

    const saved = await newPost.save();
    res.status(200).json(saved);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error creating post" });
  }
};

//update post

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: post, msg: "post have been updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Post not found" });
  }
};

// delete post

exports.deleteSinglePost = async (req, res) => {
  try {
    await Post.deleteOne({ id: req.params.id });
    res.status(200).json({ success: true, msg: "post have been deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Post can not be deleted" });
  }
};
