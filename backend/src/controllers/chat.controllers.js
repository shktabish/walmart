import Chat from '../models/chat.model.js'
import { generateDescription } from '../utils/geminiDescp.js'
import { getTopRecommendations } from '../utils/recommender.js';
import { AssemblyAI } from 'assemblyai';
import uploadOnCloudinary from '../utils/cloudinary.js';
import fs from 'fs';

const getBotResponse = async (message) => {
    try {
        const description = await generateDescription(message);
        const response = await getTopRecommendations(description);
        return { sender: 'bot', products: response };
    } catch (error) {
        console.error("Error generating bot response:", error);
        return { sender: 'bot', products: "Sorry, I couldn't process your request." };
    }
}

export const getChatHistory = async (req, res) => {
    try {
        const chatHistory = await Chat.find({user: req.user._id})
        return res.status(200).json({chatHistory})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while fetching the chat history."})
    }
}

export const createChat = async (req, res) => {
    try {
        const { firstMessage } = req.body
        console.log("here")
        const message = {sender: 'user', message: firstMessage}
        const botRes = await getBotResponse(firstMessage)
        const chat = await Chat.create({firstMessage, user: req.user._id, message: [message, botRes] })
        return res.status(201).json({chat})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while creating the chat."})
    }
}

export const updateChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
        if (!chat) {
            return res.status(404).json({message: "Chat not found"})
        }

        const { message } = req.body
        if(!message) {
            return res.status(400).json({message: "Message is required"})
        }

        const userMessage = {sender: 'user', message}
        chat.message.push(userMessage)

        const response = await getBotResponse(message)
        chat.message.push(response)

        await chat.save()
        return res.status(200).json({response})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while updating the chat."})
    }
}

export const getMessages = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
        if (!chat) {
            return res.status(404).json({message: "Chat not found"})
        }
        return res.status(200).json({message: chat.message})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message: "Something went wrong while fetching the messages."})
    }
}



const client = new AssemblyAI({
    apiKey: "04a9b82a2bb74df1a4fb363e8cf0bd90" 
  });
  
  export const handleAudioInput = async (req, res) => {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No audio file uploaded" });
        }

        console.log('Received audio file');
        const audio = fs.readFileSync(req.file.path);
        const audioBytes = audio.toString('base64');

        const cloudinaryResult = await uploadOnCloudinary(req.file.path);
        const audioUrl = cloudinaryResult.secure_url;

    // Ensure the audio URL is valid
        if (!audioUrl.startsWith('http')) {
            throw new Error('Transcript creation error, audio_url should start with http');
        }

    // Transcribe the audio using AssemblyAI
        const config = {
        audio_url: audioUrl
        };

        const transcriptResponse = await client.transcripts.transcribe(config);
        const transcription = transcriptResponse.text;
        console.log(`Transcription: ${transcription}`);

        const chat = await Chat.findById(req.params.chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        const userMessage = { sender: 'user', message: transcription };
        chat.message.push(userMessage);


        const botResponse = await getBotResponse(transcription);
        chat.message.push(botResponse);
        console.log(chat)

        
        await chat.save();

        const lastTwoMessages = chat.message.slice(-2); 

        return res.status(200).json({ messages: lastTwoMessages });
    } catch (error) {
        console.error("Error handling audio input:", error.message, error.stack);
        return res.status(500).json({ message: "Something went wrong while processing the audio input." });
    }
};
