import Chat from '../models/chat.model.js'
import { generateDescription } from '../utils/geminiDescp.js'
import { getTopRecommendations } from '../utils/recommender.js';
import fs from 'fs';
import { AssemblyAI } from 'assemblyai';
import uploadOnCloudinary from '../utils/cloudinary.js';

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
    apiKey: "04a9b82a2bb74df1a4fb363e8cf0bd90" // Your AssemblyAI API key
  });
  
  export const handleAudioInput = async (req, res) => {
    try {
      if (!req.file || !req.file.path) {
        return res.status(400).json({ message: "No audio file uploaded" });
      }
  
      
      const cloudinaryResult = await uploadOnCloudinary(req.file.path);
      const audioUrl = cloudinaryResult.secure_url;
  
      
      if (!audioUrl.startsWith('http')) {
        throw new Error('Transcript creation error, audio_url should start with http');
      }
  
      
      const config = {
        audio_url: audioUrl
      };
  
      const transcript = await client.transcripts.transcribe(config);
  
      
      if (transcript.status !== 'completed') {
        throw new Error('Transcript creation error');
      }
  
      const transcriptionText = transcript.text;
      console.log(`Transcription: ${transcriptionText}`);
  
      
      const chat = await Chat.findById(req.params.chatId);
      if (!chat) {
        return res.status(404).json({ message: "Chat not found" });
      }
  
      const userMessage = { sender: 'user', message: transcriptionText };
      chat.message.push(userMessage);
  
      const botResponse = await getBotResponse(transcriptionText);
      chat.message.push(botResponse);
  
      await chat.save();
  
      return res.status(200).json({ chat });
    } catch (error) {
      console.error("Error handling audio input:", error.message, error.stack);
      return res.status(500).json({ message: "Something went wrong while processing the audio input." });
    }
  };