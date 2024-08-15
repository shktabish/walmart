import express from "express"
import verifyJWT from "../middlewares/auth.middlewares.js"
import { createChat, getChatHistory, getMessages, handleAudioInput, updateChat } from "../controllers/chat.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

const router = express.Router()

router.use(verifyJWT)

router.get("/", getChatHistory)
router.post("/createChat", createChat)
router.put("/updateChat/:chatId", updateChat)
router.get("/getMessages/:chatId", getMessages)
router.post("/audio/:chatId", upload.single('audio'), handleAudioInput)

export default router