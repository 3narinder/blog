import aws from "aws-sdk";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

import Blog from "../Schema/Blog.js";
import User from "../Schema/User.js";

const s3 = new aws.S3({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//upload image of poster
const generateUpload = async () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

  return await s3.getSignedUrlPromise("putObject", {
    Bucket: "tech-blog-website",
    Key: imageName, // Correct capitalization
    Expires: 1000, // Time in seconds
    ContentType: "image/jpeg", // Correct capitalization
  });
};
export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    return res.status(401).json({ error: "No access token" });
  }

  jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Access token is invalid" });
    }

    req.user = user.id;
    next();
  });
};

export const uploadImageAws = async (req, res) => {
  try {
    const url = await generateUpload();
    res.status(200).json({ uploadUrl: url });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    let authorId = req.user;

    let { title, banner, content, tags, des, draft } = req.body;
    if (!draft) {
      if (!des?.length || des.length > 200) {
        return res.status(403).json({
          error: "You must provide a description under 200 characters",
        });
      }

      if (!banner?.length) {
        return res
          .status(403)
          .json({ error: "You must provide a banner to publish it" });
      }

      if (!content?.blocks?.length) {
        return res
          .status(403)
          .json({ error: "There must be some blog content to publish it" });
      }

      if (!tags?.length || tags.length > 10) {
        return res
          .status(403)
          .json({ error: "Provide tags in order to publish it, maximum 10" });
      }
    }

    if (!title?.length) {
      return res
        .status(403)
        .json({ error: "You need to provide a title to publish the blog" });
    }

    tags = tags?.map((tag) => tag?.toLowerCase());

    let blog_id = `${title
      ?.replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim()}-${nanoid()}`; // Append a unique ID

    // Create a new blog instance
    const blog = new Blog({
      title,
      des,
      tags,
      content,
      banner,
      author: authorId,
      blog_id,
      draft: Boolean(draft),
    });

    // Save the blog
    const savedBlog = await blog.save();

    // Update the user document
    let incrementVal = draft ? 0 : 1;
    const user = await User.findOneAndUpdate(
      { _id: authorId },
      {
        $inc: { "account_info.total_posts": incrementVal },
        $push: { blogs: savedBlog._id },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res
        .status(500)
        .json({ error: "Failed to update the user's total posts" });
    }

    // Respond with the blog ID
    return res.status(200).json({ id: savedBlog.blog_id });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the blog" });
  }
};
