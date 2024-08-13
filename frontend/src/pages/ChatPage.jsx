import { ChatHistory } from "@/components/chat/ChatHistory"
import { ChatHeader } from "@/components/chat/ChatHeader"
import { ChatMessages } from "@/components/chat/ChatMessages"
import { ChatInput } from "@/components/chat/ChatInput"

export default function ChatPage() {
  return (
    <div className="flex min-h-screen w-full bg-background text-black">
      <ChatHistory />
      <div className="flex flex-col w-full">
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </div>
    </div>
  )
}
