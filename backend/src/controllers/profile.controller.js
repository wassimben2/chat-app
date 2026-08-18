import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id;
    if (!profilePicture) {
      return res
        .status(400)
        .json({ error: "Please provide a profile picture" });
    }
    const uploadResult = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResult.secure_url },
      { new: true }
    ).select("-password");

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
