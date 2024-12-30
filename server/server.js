import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

const server = express();
const PORT = 3000;

server.use(express.json());
server.use(cors());

mongoose.connect(process.env.DB_LOCATION, { autoIndex: true });

//setting up s3 bucket

server.use("/", userRoutes);
server.use("/blog", blogRoutes);

server.listen(PORT, () => console.log(`${PORT} is running`));
