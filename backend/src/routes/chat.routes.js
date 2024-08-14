import express from "express"
import verifyJWT from "../middlewares/auth.middlewares.js"
import { createChat, getChatHistory, getMessages, updateChat } from "../controllers/chat.controllers.js";

const router = express.Router()

router.use(verifyJWT)

router.get("/", getChatHistory)
router.post("/createChat", createChat)
router.put("/updateChat/:chatId", updateChat)
router.get("/getMessages/:chatId", getMessages)

export default router