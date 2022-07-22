const express = require("express");
const DBconnect = require("./config/database");
const app = express();

DBconnect();

// middlewares
app.use(express.json());

// routes
const postRouter = require("../api/routes/postRoutes");
const categoryRouter = require("../api/routes/categoryRoutes");

app.use("/api/blogpost", postRouter);
app.use("/api/blogcategory", categoryRouter);

app.listen("5000", () => {
  console.log("api is running");
});
