import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
const app = express();

import authRoutes from "./routes/auth.js";

dotenv.config();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3001");
  connectDB();
});
