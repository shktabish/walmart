import Chat from '../models/chat.model.js'
import { generateDescription } from '../utils/geminiDescp.js'

export const getChatHistory = async (req, res) => {
    try {
        const chatHistory = await Chat.find({user: req.user._id})
        chatHistory
        return res.status(200).json({chatHistory})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while fetching the chat history."})
    }
}

export const createChat = async (req, res) => {
    try {
        const { firstMessage } = req.body
        const message = [{sender: 'user', message: firstMessage}]
        const chat = await Chat.create({firstMessage, user: req.user._id, message })
        return res.status(201).json({chat})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while creating the chat."})
    }
}

export const updateChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
        if (!chat) {
            return res.status(404).json({message: "Chat not found"})
        }

        const { message } = req.body
        if(!message) {
            return res.status(400).json({message: "Message is required"})
        }

        const userMessage = {sender: 'user', message}
        chat.message.push(userMessage)

        const description = await generateDescription(message)
        
        await chat.save()
        return res.status(200).json({chat})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while updating the chat."})
    }
}