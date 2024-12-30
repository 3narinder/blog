import aws from "aws-sdk";
import { nanoid } from "nanoid";

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

export const uploadImageAws = async (req, res) => {
  try {
    const url = await generateUpload();
    res.status(200).json({ uploadUrl: url });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};
