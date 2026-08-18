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
      profilePicture: newUser.profilePicture,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json("Logged out succesfully");
  } catch (err) {
    console.log(err);
  }
};
export const CheckAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    console.log("Error in CheckAuth controller:", err);
  }
};
