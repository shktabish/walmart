import dotenv from "dotenv"
dotenv.config()

import connectDB from "./db/db.js"
import { app } from "./app.js"
import { Server } from "socket.io"

const PORT = process.env.PORT || 3000

connectDB()
.then(() => {
    const server = app.listen(PORT, () => {
        console.log(`Server listening on PORT ${PORT}`)
    })

    const io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: true,
            credentials: true
        }
    })

    io.on("connection", (socket) => {
        console.log("Socket connected: ", socket.id)
    })
})
.catch((err) => {
    console.log("Error in connecting MongoDB ", err)
})