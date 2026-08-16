import cloudinary from "../lib/cloudinary.js";
export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.user._id;
    if (!profilePicture) {
      return res
        .status(400)
        .json({ error: "Please provide a profile picture" });
    }
    await cloudinary.uploader.upload(profilePicture);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
