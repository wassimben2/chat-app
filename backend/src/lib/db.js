import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URL_CONNECTION_STRING,
    );
    console.log("CONNECTED TO DB");
  } catch (err) {
    console.log("MONGODB CONNECTION ERROR", err);
  }
};
