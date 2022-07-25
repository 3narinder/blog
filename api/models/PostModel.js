const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: String,
    slug: {
      type: String,
      slug: "title",
      lowercase: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Not valid rating"],
      max: [5, "Not valid rating"],
    },
    content: String,
    images: {
      type: Array,
      default:
        "https://images.unsplash.com/photo-1611619899256-5e61d4c46df9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    category: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
