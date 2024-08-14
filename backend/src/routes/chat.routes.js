import express from "express"
import verifyJWT from "../middlewares/auth.middlewares"
import router from './user.routes';
import { createChat, getChatHistory, updateChat } from "../controllers/chat.controllers";

const router = express.Router()

router.use(verifyJWT)

router.get("/chat", getChatHistory)
router.get("/chat", createChat)
router.put("/chat/:id", updateChat)