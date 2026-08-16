import jwt from "jsonwebtoken";
const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true, // prevent XSS attacks
    secure: process.env.NODE_ENV !== "development", // enable only in production
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "strict", // prevent CSRF attacks
  });
  return token;
};
export { generateToken };
