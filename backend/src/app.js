import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

//routes import
import userRouter from "./routes/user.routes.js"
import chatRouter from "./routes/chat.routes.js"

//routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/chat", chatRouter)

export { app }
