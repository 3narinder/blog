const express = require("express");
const DBconnect = require("./config/database");
const cors = require("cors");

const passport = require("passport");
const session = require("express-session");

DBconnect();
const app = express();
require("./config/passport")(passport);

// middlewares
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "gabrial",
  })
);
app.use(express.json());
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// routes
const postRouter = require("../api/routes/postRoutes");
const categoryRouter = require("../api/routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/blogpost", postRouter);
app.use("/api/blogcategory", categoryRouter);
app.use("/api/user", userRoutes);

app.listen("5000", () => {
  console.log("api is running");
});
