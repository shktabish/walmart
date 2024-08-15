import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import api from "@/utils/axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function ChatHistory() {
  const [chatHistory, setChatHistory] = useState([])

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await api.get("/chat")
        setChatHistory(response.data.chatHistory.reverse())
        console.log(response.data.chatHistory)
      } catch (error) {
        console.error(error.message)
      }
    }

    fetchChatHistory()
  }, [])

  return (
    <aside className="hidden w-64 border-r border-r-white/30 bg-[#0E100F] sm:flex flex-col">
      <div className="flex h-14 items-center px-4">
        <h2 className="text-lg font-semibold">Chat History</h2>
      </div>
      <div className="h-[calc(100vh-56px)] overflow-y-scroll overflow-x-hidden w-full py-4 px-2">
        <div className="grid gap-4">
          {
            chatHistory.map((chat, index) => (
              <ChatLink
                key={index}
                href={`/chat/${chat._id}`}
                message={chat.message[0].message}
                time={new Date(chat.createdAt).toLocaleTimeString()}
              />
            ))
          }
        </div>
      </div>
    </aside>
  )
}

function ChatLink({ href, message }) {
  return (
    <Link
      to={href}
      className="rounded-md bg-white/10 p-3 transition-colors hover:bg-white/5 w-[240px] mx-auto"
    >
      <div className="text-sm text-[#CCCCCC] truncate">{message}</div>
    </Link>
  )
}
