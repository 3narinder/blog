const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    slug: "name",
    lowercase: true,
    index: true,
  },
});

module.exports = mongoose.model("category", CategorySchema);
