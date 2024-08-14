import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
    {
        message: [
            {
                sender: {
                    enum: ['user', 'bot'],
                    type: String,
                },
                message: {
                    type: String,
                },
            }
        ],
        fristMessage: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model("Chat", chatSchema)

export default Chat