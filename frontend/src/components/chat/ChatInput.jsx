import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import api from "@/utils/axios"
import { ArrowUpIcon, Mic } from "lucide-react"
import { useState, useEffect, useRef } from "react";
import { useChat } from "@/context/ChatContext";
import { useNavigate } from "react-router-dom"


export function ChatInput({ message, setMessage, setMessages }) {
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const { chatId } = useChat();
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    console.log(`Chat ID from URL: ${chatId}`); 
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, chatId]);

  const handleClick = async () => {
    if (!(message.trim() === "")) {
      console.log(`Sending message: ${message}`)

      setMessage("")

      if(chatId === "chat") {
        const res = await createChat()
        navigate(`/chat/${res?.chat?._id}`)
      } else {
        setMessages((prev) => [...prev, { sender: "user", message }])
        const res = await updateChat()
        const { sender, products } = res.response
        setMessages((prev) => [...prev, { sender, products }])
      }
    }
  }

  const createChat = async () => {
    try {
      const { data } = await api.post("/chat/createChat", { firstMessage: message })
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const updateChat = async () => {
    try {
      const { data } = await api.put(`/chat/updateChat/${chatId}`, { message })
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      const audioChunks = [];
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener('stop', async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob);
        
        try {
          const { data } = await api.post(`/chat/audio/${chatId}`, formData);
          console.log(data);
        } catch (error) {
          console.error("Error sending audio message:", error);
        }
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }

  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleMicClick = () => {
    setIsRecording((prevState) => !prevState);
  };

  return (
    <div className="border-t bg-muted/40 p-4">
      <div className="relative">
        <Textarea
          placeholder="Type your message..."
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1}
          className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-20"
        />
        <Mic 
          className={`absolute w-6 h-6 top-4 right-14 ${isRecording ? 'text-red-500' : ''}`} 
          onClick={handleMicClick}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute w-8 h-8 top-3 right-3"
          onClick={() => handleClick()}
        >
          <ArrowUpIcon className="w-4 h-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  );

