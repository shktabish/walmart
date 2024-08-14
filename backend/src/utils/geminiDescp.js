import { GoogleGenerativeAI } from '@google/generative-ai'

// Set up your API key
const API_KEY = 'AIzaSyCYhBGsWPGwEaq58Nu7ot04oYNTSD1IY44'
const genAI = new GoogleGenerativeAI(API_KEY)

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

// Function to generate a description using Google Gemini
export const generateDescription = async (text) => {
  try {
    const prompt = `Write a description based on the following: "${text}". Do not use any markup language and write in 1 paragraph only.`
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error generating description:', error)
    return null
  }
}
