import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import { getAuth } from "firebase-admin/auth";
import serviceAccountKey from "../my-mern-blog-1993-firebase-adminsdk-upykv-94ac38de34.json" assert { type: "json" };

import admin from "firebase-admin";

import User from "../Schema/User.js"; // Assuming User schema is defined here

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const formatDataToSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

const generateUserName = async (email) => {
  let username = email.split("@")[0];

  let isUserNotUnique = await User.exists({
    "personal_info.username": username,
  }).then((result) => result);

  isUserNotUnique ? (username += nanoid().substring(0, 5)) : "";

  return username;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

//sign up
const signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Full name should be at least 3 letters long" });
  }

  if (!email || !emailRegex.test(email)) {
    return res.status(403).json({ error: "Invalid email" });
  }

  if (!password || !passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a number, 1 lowercase and 1 uppercase letter",
    });
  }

  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const username = await generateUserName(email);

    const user = new User({
      personal_info: {
        fullname,
        email,
        password: hashed_password,
        username,
      },
    });

    const savedUser = await user.save();
    return res.status(201).json(formatDataToSend(savedUser));
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ error: "Email already in use. Try a different one." });
    }
    console.error(err); // Log the error for debugging
    return res.status(500).json({ error: "An error occurred during signup." });
  }
};

//sign in
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ "personal_info.email": email });

    if (!user) {
      return res.status(403).json({ error: "Email not found" });
    }

    if (!user.google_auth) {
      bcrypt.compare(password, user.personal_info.password, (err, result) => {
        if (err) {
          return res
            .status(403)
            .json({ error: "Error while login. Please try again" });
        }

        if (!result) {
          return res.status(403).json({ error: "Incorrect password" });
        } else {
          return res.status(200).json(formatDataToSend(user));
        }
      });
    } else {
      return res.status(403).json({
        error: "Account was created using google try login with gogle.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//Google auth
const googleAuth = async (req, res) => {
  const { access_token } = req.body;

  if (!access_token || typeof access_token !== "string") {
    return res.status(400).json({ error: "Invalid access token provided." });
  }

  try {
    const decodedUser = await getAuth().verifyIdToken(access_token);

    const { email, name, picture } = decodedUser;

    const updatedPicture = picture?.replace("s96-c", "s384-c") || "";

    let user = await User.findOne({ "personal_info.email": email }).select(
      "personal_info.username personal_info.profile_img personal_info.google_auth"
    );

    if (user) {
      if (user.google_auth === false) {
        return res.status(403).json({
          error:
            "This email was signed up without Google. Please log in with a password to access the account.",
        });
      }
    } else {
      const username = await generateUserName(email);

      user = new User({
        personal_info: {
          fullname: name || "Unknown User",
          email,
          username,
        },
        google_auth: true,
      });

      await user.save();
    }

    return res.status(200).json(formatDataToSend(user));
  } catch (err) {
    console.error("Error verifying token:", err);
    return res
      .status(500)
      .json({ error: "Failed to authenticate with Google." });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    // Fetch specific fields from the database
    const users = await User.find(
      {},
      "personal_info.username personal_info.fullname"
    );

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { signup, login, googleAuth };
