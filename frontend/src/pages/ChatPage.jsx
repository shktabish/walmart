import { ChatHistory } from "@/components/chat/ChatHistory"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatMessages } from "@/components/chat/ChatMessages"
import { ChatInput } from "@/components/chat/ChatInput"
import { NewChat } from "@/components/chat/NewChat"

import { Route, Routes,  useParams } from "react-router-dom"
import { useChat } from "@/context/ChatContext";
import { useEffect} from "react";
import { useState } from "react"


export default function ChatPage() {
  const { chatId } = useParams();
  const { setChatId } = useChat();
  
  useEffect(() => {
    if (chatId) {
      setChatId(chatId);
      console.log(`Chat Id : ${chatId}`)
    }
  }, [chatId, setChatId]);
  
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([]) 

  return (
    <div className="flex min-h-screen w-full bg-background text-black">
      <ChatHistory />
      <div className="flex flex-col w-full">
        <ChatHeader />
        <Routes>
          <Route path="/" element={<NewChat setMessage={setMessage} />} />
          <Route path="/:chatId" element={<ChatMessages messages={messages} setMessages={setMessages} />} />
        </Routes>
        <ChatInput message={message} setMessage={setMessage} setMessages={setMessages} />
      </div>
    </div>
  );
}
