import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { authProtected } from "../middleware/auth.middleware.js";
import { getmessages } from "../controllers/user.controller.js";
import { sendMessage } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/users", authProtected, getUsers);
router.get("/:id", authProtected, getmessages);
router.post("/send", authProtected, sendMessage);
export default router;
