import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
const app = express();

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5174",
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3001");
  connectDB();
});
