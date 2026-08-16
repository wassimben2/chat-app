import jwt from "jsonwebtoken";
import user from "../models/user.model.js";
export const authProtected = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    const User = await user.findById(decoded.userId).select("-password");
    if (!User) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = User;
    next();
  } catch (err) {
    console.log("Error in authProtected middleware:", err);
    return res.status(401).json({ error: "Unauthorized error" });
  }
};
