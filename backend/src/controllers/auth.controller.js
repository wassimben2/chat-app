import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utlis.js";
export const signUp = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    if (!email || !fullname || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      email,
      fullname,
      password: hashedPassword,
    });
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      fullname: newUser.fullname,
      profielpicture: newUser.profielpicture,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    console.log(req.body);
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (req, res) => {};
