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
    images: { type: Array },
    category: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
