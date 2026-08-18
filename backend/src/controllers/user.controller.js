import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { config } from "dotenv";

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Failed to fetch users for the sidebar", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getmessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { receiverId: myId, senderId: userToChatId },
      ],
    }); //this basically gets all of the messages where i was the sender or the receiver or both so it assures that i get all of the messages between me and the user i want to chat with
    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { receiverId } = req.params;
    const myId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: myId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    //todo : realtime functionality goes here using socket.io
    res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
