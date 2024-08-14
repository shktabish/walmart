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
                products: [
                    {
                        product_name: {
                            type: String,
                        },
                        image_link: {
                            type: String,
                        },
                        product_link: {
                            type: String,
                        },
                        ratings: {
                            type: Number,
                        },
                        discount_price: {
                            type: Number,
                        },
                        actual_price: {
                            type: Number,
                        },
                        description: {
                            type: String,
                        },
                    },
                ],
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