import express from "express"
import { loginUser, registerUser, logoutUser, getCurrentUser, getUserById, getNewAccessToken } from "../controllers/user.controllers.js"
import upload from '../middlewares/multer.middlewares.js'
import verifyJWT from './../middlewares/auth.middlewares.js'

const router = express.Router()

router.post("/register", upload.single('avatar'), registerUser)

router.post("/login", loginUser)

router.get("/logout", verifyJWT, logoutUser)

router.get("/me",verifyJWT, getCurrentUser)

router.get("/users/:id", verifyJWT, getUserById)

router.get("/accessToken", getNewAccessToken)

export default router