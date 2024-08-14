import { ChatHistory } from "@/components/chat/ChatHistory"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatMessages } from "@/components/chat/ChatMessages"
import { ChatInput } from "@/components/chat/ChatInput"
import { NewChat } from "@/components/chat/NewChat"

import { io } from "socket.io-client"
import { Route, Routes } from "react-router-dom"

export default function ChatPage() {
  const socket = io("http://localhost:3000")
  
  return (
    <div className="flex min-h-screen w-full bg-background text-black">
      <ChatHistory />
      <div className="flex flex-col w-full">
        <ChatHeader />
        <Routes>
          <Route path="/" element={<NewChat />} />
          <Route path="/:chatId" element={<ChatMessages />} />
        </Routes>
        <ChatInput />
      </div>
    </div>
  )
}
